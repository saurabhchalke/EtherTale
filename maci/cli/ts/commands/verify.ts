import {
  Tally__factory as TallyFactory,
  TallyNonQv__factory as TallyNonQvFactory,
  MACI__factory as MACIFactory,
  Subsidy__factory as SubsidyFactory,
  Poll__factory as PollFactory,
  Tally,
  TallyNonQv,
} from "maci-contracts/typechain-types";
import { hash2, hash3, genTreeCommitment, hashLeftRight } from "maci-crypto";

import type { VerifyArgs } from "../utils/interfaces";

import { banner } from "../utils/banner";
import { contractExists } from "../utils/contracts";
import { info, logError, logGreen, logYellow, success } from "../utils/theme";
import { verifyPerVOSpentVoiceCredits, verifyTallyResults } from "../utils/verifiers";

/**
 * Verify the results of a poll and optionally the subsidy results on-chain
 * @param VerifyArgs - The arguments for the verify command
 */
export const verify = async ({
  pollId,
  subsidyEnabled,
  tallyData,
  maciAddress,
  tallyAddress,
  subsidyAddress,
  subsidyData,
  signer,
  quiet = true,
}: VerifyArgs): Promise<void> => {
  banner(quiet);

  const tallyResults = tallyData;
  const useQv = tallyResults.isQuadratic;

  // we prioritize the tally file data
  const tallyContractAddress = tallyResults.tallyAddress || tallyAddress;

  if (!tallyContractAddress) {
    logError("Tally contract address is empty");
  }

  if (!(await contractExists(signer.provider!, tallyContractAddress))) {
    logError(`Error: there is no Tally contract deployed at ${tallyContractAddress}.`);
  }

  // prioritize the tally file data
  const maciContractAddress = tallyResults.maci || maciAddress;

  // check existence of MACI, Tally and Subsidy contract addresses
  if (!maciContractAddress) {
    logError("MACI contract address is empty");
  }

  if (!(await contractExists(signer.provider!, maciContractAddress))) {
    logError(`Error: there is no MACI contract deployed at ${maciContractAddress}.`);
  }

  let subsidyContractAddress = "";

  // subsidy validation
  if (subsidyEnabled) {
    subsidyContractAddress = subsidyAddress!;

    if (!subsidyContractAddress) {
      logError("Subsidy contract address is empty");
    }

    if (!(await contractExists(signer.provider!, subsidyContractAddress))) {
      logError(`Error: there is no Subsidy contract deployed at ${subsidyContractAddress}.`);
    }
  }

  // get the contract objects
  const maciContract = MACIFactory.connect(maciContractAddress, signer);
  const pollAddr = await maciContract.polls(pollId);

  const pollContract = PollFactory.connect(pollAddr, signer);

  const subsidyContract = subsidyEnabled ? SubsidyFactory.connect(subsidyContractAddress, signer) : undefined;
  const tallyContract = useQv
    ? TallyFactory.connect(tallyContractAddress, signer)
    : TallyNonQvFactory.connect(tallyContractAddress, signer);

  // verification
  const onChainTallyCommitment = BigInt(await tallyContract.tallyCommitment());

  logYellow(quiet, info(`on-chain tally commitment: ${onChainTallyCommitment.toString(16)}`));

  // check the results commitment
  const validResultsCommitment = tallyResults.newTallyCommitment.match(/0x[a-fA-F0-9]+/);

  if (!validResultsCommitment) {
    logError("Invalid results commitment format");
  }

  const treeDepths = await pollContract.treeDepths();
  const voteOptionTreeDepth = Number(treeDepths.voteOptionTreeDepth);
  const numVoteOptions = 5 ** voteOptionTreeDepth;

  if (tallyResults.results.tally.length !== numVoteOptions) {
    logError("Wrong number of vote options.");
  }

  // compute newResultsCommitment
  const newResultsCommitment = genTreeCommitment(
    tallyResults.results.tally.map((x) => BigInt(x)),
    BigInt(tallyResults.results.salt),
    voteOptionTreeDepth,
  );

  // compute newSpentVoiceCreditsCommitment
  const newSpentVoiceCreditsCommitment = hash2([
    BigInt(tallyResults.totalSpentVoiceCredits.spent),
    BigInt(tallyResults.totalSpentVoiceCredits.salt),
  ]);

  if (useQv) {
    if (tallyResults.perVOSpentVoiceCredits?.tally.length !== numVoteOptions) {
      logError("Wrong number of vote options.");
    }

    // verify that the results commitment matches the output of genTreeCommitment()

    // compute newPerVOSpentVoiceCreditsCommitment
    const newPerVOSpentVoiceCreditsCommitment = genTreeCommitment(
      tallyResults.perVOSpentVoiceCredits!.tally.map((x) => BigInt(x)),
      BigInt(tallyResults.perVOSpentVoiceCredits!.salt),
      voteOptionTreeDepth,
    );

    // compute newTallyCommitment
    const newTallyCommitment = hash3([
      newResultsCommitment,
      newSpentVoiceCreditsCommitment,
      newPerVOSpentVoiceCreditsCommitment,
    ]);

    if (onChainTallyCommitment !== newTallyCommitment) {
      logError("The on-chain tally commitment does not match.");
    }
    logGreen(quiet, success("The on-chain tally commitment matches."));

    // verify total spent voice credits on-chain
    const isValid = await (tallyContract as Tally).verifySpentVoiceCredits(
      tallyResults.totalSpentVoiceCredits.spent,
      tallyResults.totalSpentVoiceCredits.salt,
      newResultsCommitment,
      newPerVOSpentVoiceCreditsCommitment,
    );

    if (isValid) {
      logGreen(quiet, success("The on-chain verification of total spent voice credits passed."));
    } else {
      logError("The on-chain verification of total spent voice credits failed.");
    }

    // verify per vote option voice credits on-chain
    const failedSpentCredits = await verifyPerVOSpentVoiceCredits(
      tallyContract as Tally,
      tallyResults,
      voteOptionTreeDepth,
      newSpentVoiceCreditsCommitment,
      newResultsCommitment,
    );

    if (failedSpentCredits.length === 0) {
      logGreen(quiet, success("The on-chain verification of per vote option spent voice credits passed"));
    } else {
      logError(
        `At least one tally result failed the on-chain verification. Please check your Tally data at these indexes: ${failedSpentCredits.join(
          ", ",
        )}`,
      );
    }

    // verify tally result on-chain for each vote option
    const failedPerVOSpentCredits = await verifyTallyResults(
      tallyContract,
      tallyResults,
      voteOptionTreeDepth,
      newSpentVoiceCreditsCommitment,
      newPerVOSpentVoiceCreditsCommitment,
    );

    if (failedPerVOSpentCredits.length === 0) {
      logGreen(quiet, success("The on-chain verification of tally results passed"));
    } else {
      logError(
        `At least one spent voice credits entry in the tally results failed the on-chain verification. Please check your tally results at these indexes: ${failedPerVOSpentCredits.join(
          ", ",
        )}`,
      );
    }
  } else {
    // verify that the results commitment matches the output of genTreeCommitment()

    // compute newTallyCommitment
    const newTallyCommitment = hashLeftRight(newResultsCommitment, newSpentVoiceCreditsCommitment);

    if (onChainTallyCommitment !== newTallyCommitment) {
      logError("The on-chain tally commitment does not match.");
    }
    logGreen(quiet, success("The on-chain tally commitment matches."));

    // verify total spent voice credits on-chain
    const isValid = await (tallyContract as TallyNonQv).verifySpentVoiceCredits(
      tallyResults.totalSpentVoiceCredits.spent,
      tallyResults.totalSpentVoiceCredits.salt,
      newResultsCommitment,
    );

    if (isValid) {
      logGreen(quiet, success("The on-chain verification of total spent voice credits passed."));
    } else {
      logError("The on-chain verification of total spent voice credits failed.");
    }

    // verify tally result on-chain for each vote option
    const failedResult = await verifyTallyResults(
      tallyContract,
      tallyResults,
      voteOptionTreeDepth,
      newSpentVoiceCreditsCommitment,
    );

    if (failedResult.length === 0) {
      logGreen(quiet, success("The on-chain verification of tally results passed"));
    } else {
      logError(
        `At least one result entry in the tally results failed the on-chain verification. Please check your tally results at these indexes: ${failedResult.join(
          ", ",
        )}`,
      );
    }
  }

  // verify subsidy result if subsidy file is provided
  if (subsidyEnabled && subsidyData && subsidyContract !== undefined) {
    const onChainSubsidyCommitment = BigInt(await subsidyContract.subsidyCommitment());

    logYellow(quiet, info(`on-chain subsidy commitment: ${onChainSubsidyCommitment.toString(16)}`));

    // check the results commitment
    const validResultsSubsidyCommitment = subsidyData.newSubsidyCommitment.match(/0x[a-fA-F0-9]+/);

    if (!validResultsSubsidyCommitment) {
      logError("Invalid results commitment format");
    }

    if (subsidyData.results.subsidy.length !== numVoteOptions) {
      logError("Wrong number of vote options.");
    }

    // compute the new SubsidyCommitment
    const newSubsidyCommitment = genTreeCommitment(
      subsidyData.results.subsidy.map((x) => BigInt(x)),
      BigInt(subsidyData.results.salt),
      voteOptionTreeDepth,
    );

    if (onChainSubsidyCommitment !== newSubsidyCommitment) {
      logError("The on-chain subsidy commitment does not match.");
    }

    logGreen(quiet, success("The on-chain subsidy commitment matches."));
  }
};
