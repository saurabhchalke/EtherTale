import { Keypair } from "maci-domainobjs";

import { homedir } from "os";

import {
  CheckVerifyingKeysArgs,
  DeployArgs,
  DeployPollArgs,
  MergeMessagesArgs,
  MergeSignupsArgs,
  ProveOnChainArgs,
  SetVerifyingKeysArgs,
  TallyData,
  TimeTravelArgs,
  VerifyArgs,
  readJSONFile,
} from "../ts/utils";

export const STATE_TREE_DEPTH = 10;
export const INT_STATE_TREE_DEPTH = 1;
export const MSG_TREE_DEPTH = 2;
export const VOTE_OPTION_TREE_DEPTH = 2;
export const MSG_BATCH_DEPTH = 1;
const coordinatorKeypair = new Keypair();
export const coordinatorPubKey = coordinatorKeypair.pubKey.serialize();
export const coordinatorPrivKey = coordinatorKeypair.privKey.serialize();
export const processMessageTestZkeyPath = "./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey";
export const tallyVotesTestZkeyPath = "./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey";
export const processMessageTestNonQvZkeyPath =
  "./zkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test.0.zkey";
export const tallyVotesTestNonQvZkeyPath = "./zkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test.0.zkey";
export const subsidyTestZkeyPath = "./zkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test.0.zkey";
export const testTallyFilePath = "./tally.json";
export const testSubsidyFilePath = "./subsidy.json";
export const testProofsDirPath = "./proofs";
export const testProcessMessagesWitnessPath =
  "./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/ProcessMessages_10-2-1-2_test";
export const testProcessMessagesWitnessDatPath =
  "./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/ProcessMessages_10-2-1-2_test.dat";
export const testTallyVotesWitnessPath =
  "./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/TallyVotes_10-1-2_test";
export const testTallyVotesWitnessDatPath =
  "./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/TallyVotes_10-1-2_test.dat";
export const testSubsidyWitnessPath =
  "./zkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/SubsidyPerBatch_10-1-2_test";
export const testSubsidyWitnessDatPath =
  "./zkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_cpp/SubsidyPerBatch_10-1-2_test.dat";
export const testProcessMessagesWasmPath =
  "./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_js/ProcessMessages_10-2-1-2_test.wasm";
export const testTallyVotesWasmPath =
  "./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_js/TallyVotes_10-1-2_test.wasm";
export const testSubsidyWasmPath =
  "./zkeys/SubsidyPerBatch_10-1-2_test/SubsidyPerBatch_10-1-2_test_js/SubsidyPerBatch_10-1-2_test.wasm";
export const testRapidsnarkPath = `${homedir()}/rapidsnark/build/prover`;
export const ceremonyProcessMessagesZkeyPath = "./zkeys/ProcessMessages_6-9-2-3/processMessages_6-9-2-3.zkey";
export const ceremonyProcessMessagesNonQvZkeyPath =
  "./zkeys/ProcessMessagesNonQv_6-9-2-3/processMessagesNonQv_6-9-2-3.zkey";
export const ceremonyTallyVotesZkeyPath = "./zkeys/TallyVotes_6-2-3/tallyVotes_6-2-3.zkey";
export const ceremonyTallyVotesNonQvZkeyPath = "./zkeys/TallyVotesNonQv_6-2-3/tallyVotesNonQv_6-2-3.zkey";
export const ceremonyProcessMessagesWitnessPath =
  "./zkeys/ProcessMessages_6-9-2-3/ProcessMessages_6-9-2-3_cpp/ProcessMessages_6-9-2-3";
export const ceremonyProcessMessagesNonQvWitnessPath =
  "./zkeys/ProcessMessagesNonQv_6-9-2-3/ProcessMessagesNonQv_6-9-2-3_cpp/ProcessMessagesNonQv_6-9-2-3";
export const ceremonyProcessMessagesDatPath =
  "./zkeys/ProcessMessages_6-9-2-3/ProcessMessages_6-9-2-3_cpp/ProcessMessages_6-9-2-3.dat";
export const ceremonyProcessMessagesNonQvDatPath =
  "./zkeys/ProcessMessagesNonQv_6-9-2-3/ProcessMessagesNonQv_6-9-2-3_cpp/ProcessMessagesNonQv_6-9-2-3.dat";
export const ceremonyTallyVotesWitnessPath = "./zkeys/TallyVotes_6-2-3/TallyVotes_6-2-3_cpp/TallyVotes_6-2-3";
export const ceremonyTallyVotesNonQvWitnessPath =
  "./zkeys/TallyVotesNonQv_6-2-3/TallyVotesNonQv_6-2-3_cpp/TallyVotesNonQv_6-2-3";
export const ceremonyTallyVotesDatPath = "./zkeys/TallyVotes_6-2-3/TallyVotes_6-2-3_cpp/TallyVotes_6-2-3.dat";
export const ceremonyTallyVotesNonQvDatPath =
  "./zkeys/TallyVotesNonQv_6-2-3/TallyVotesNonQv_6-2-3_cpp/TallyVotesNonQv_6-2-3.dat";
export const ceremonyProcessMessagesWasmPath =
  "./zkeys/ProcessMessages_6-9-2-3/ProcessMessages_6-9-2-3_js/ProcessMessages_6-9-2-3.wasm";
export const ceremonyProcessMessagesNonQvWasmPath =
  "./zkeys/ProcessMessagesNonQv_6-9-2-3/ProcessMessagesNonQv_6-9-2-3_js/ProcessMessagesNonQv_6-9-2-3.wasm";
export const ceremonyTallyVotesWasmPath = "./zkeys/TallyVotes_6-2-3/TallyVotes_6-2-3_js/TallyVotes_6-2-3.wasm";
export const ceremonyTallyVotesNonQvWasmPath =
  "./zkeys/TallyVotesNonQv_6-2-3/TallyVotesNonQv_6-2-3_js/TallyVotesNonQv_6-2-3.wasm";
export const testProcessMessagesNonQvWitnessPath =
  "./zkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/ProcessMessagesNonQv_10-2-1-2_test";
export const testProcessMessagesNonQvWitnessDatPath =
  "./zkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_cpp/ProcessMessagesNonQv_10-2-1-2_test.dat";
export const testTallyVotesNonQvWitnessPath =
  "./zkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/TallyVotesNonQv_10-1-2_test";
export const testTallyVotesNonQvWitnessDatPath =
  "./zkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_cpp/TallyVotesNonQv_10-1-2_test.dat";
export const testProcessMessagesNonQvWasmPath =
  "./zkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_js/ProcessMessagesNonQv_10-2-1-2_test.wasm";
export const testTallyVotesNonQvWasmPath =
  "./zkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_js/TallyVotesNonQv_10-1-2_test.wasm";

export const pollDuration = 90;
export const maxMessages = 25;
export const maxVoteOptions = 25;

export const setVerifyingKeysArgs: Omit<SetVerifyingKeysArgs, "signer"> = {
  quiet: true,
  stateTreeDepth: STATE_TREE_DEPTH,
  intStateTreeDepth: INT_STATE_TREE_DEPTH,
  messageTreeDepth: MSG_TREE_DEPTH,
  voteOptionTreeDepth: VOTE_OPTION_TREE_DEPTH,
  messageBatchDepth: MSG_BATCH_DEPTH,
  processMessagesZkeyPath: processMessageTestZkeyPath,
  tallyVotesZkeyPath: tallyVotesTestZkeyPath,
};

export const setVerifyingKeysNonQvArgs: Omit<SetVerifyingKeysArgs, "signer"> = {
  quiet: true,
  stateTreeDepth: STATE_TREE_DEPTH,
  intStateTreeDepth: INT_STATE_TREE_DEPTH,
  messageTreeDepth: MSG_TREE_DEPTH,
  voteOptionTreeDepth: VOTE_OPTION_TREE_DEPTH,
  messageBatchDepth: MSG_BATCH_DEPTH,
  processMessagesZkeyPath: processMessageTestNonQvZkeyPath,
  tallyVotesZkeyPath: tallyVotesTestNonQvZkeyPath,
};

export const checkVerifyingKeysArgs: Omit<CheckVerifyingKeysArgs, "signer"> = {
  stateTreeDepth: STATE_TREE_DEPTH,
  intStateTreeDepth: INT_STATE_TREE_DEPTH,
  messageTreeDepth: MSG_TREE_DEPTH,
  voteOptionTreeDepth: VOTE_OPTION_TREE_DEPTH,
  messageBatchDepth: MSG_BATCH_DEPTH,
  processMessagesZkeyPath: processMessageTestZkeyPath,
  tallyVotesZkeyPath: tallyVotesTestZkeyPath,
};

export const timeTravelArgs: Omit<TimeTravelArgs, "signer"> = {
  seconds: pollDuration,
};

export const mergeMessagesArgs: Omit<MergeMessagesArgs, "signer"> = {
  pollId: 0n,
};

export const mergeSignupsArgs: Omit<MergeSignupsArgs, "signer"> = {
  pollId: 0n,
};

export const proveOnChainArgs: Omit<ProveOnChainArgs, "signer"> = {
  pollId: 0n,
  proofDir: testProofsDirPath,
  subsidyEnabled: false,
};

export const verifyArgs = (): Omit<VerifyArgs, "signer"> => {
  const tallyData = readJSONFile(testTallyFilePath) as unknown as TallyData;

  return {
    pollId: 0n,
    subsidyEnabled: false,
    tallyData,
    maciAddress: tallyData.maci,
    tallyAddress: tallyData.tallyAddress,
  };
};

export const deployArgs: Omit<DeployArgs, "signer"> = {
  stateTreeDepth: STATE_TREE_DEPTH,
};

export const deployPollArgs: Omit<DeployPollArgs, "signer"> = {
  pollDuration,
  intStateTreeDepth: INT_STATE_TREE_DEPTH,
  messageTreeSubDepth: MSG_BATCH_DEPTH,
  messageTreeDepth: MSG_TREE_DEPTH,
  voteOptionTreeDepth: VOTE_OPTION_TREE_DEPTH,
  coordinatorPubkey: coordinatorPubKey,
  subsidyEnabled: false,
};
