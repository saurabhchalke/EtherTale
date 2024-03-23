#!/bin/bash

echo "User 1"
read -p "Enter the vote option (1, 2, or 3) for User 1: " vote_option_1
vote_option_index_1=$((vote_option_1 - 1))

echo "User 2"
read -p "Enter the vote option (1, 2, or 3) for User 2: " vote_option_2
vote_option_index_2=$((vote_option_2 - 1))

echo "User 3"
read -p "Enter the vote option (1, 2, or 3) for User 3: " vote_option_3
vote_option_index_3=$((vote_option_3 - 1))

# Deploy VkRegistry and set verifying keys
node build/ts/index.js deployVkRegistry
node build/ts/index.js setVerifyingKeys --state-tree-depth 10 --int-state-tree-depth 1 --msg-tree-depth 2 --vote-option-tree-depth 2 --msg-batch-depth 1 --process-messages-zkey ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey --tally-votes-zkey ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey

# Create MACI instance and deploy poll
node build/ts/index.js create -s 10
node build/ts/index.js deployPoll --pubkey macipk.ea638a3366ed91f2e955110888573861f7c0fc0bb5fb8b8dca9cd7a08d7d6b93 -t 1000 -i 1 -m 2 -b 1 -v 2 -se false

# Get poll details
node build/ts/index.js getPoll --quiet false

user_pubkeys=(
  "macipk.e743ffb5298ef0f5c1f63b6464a48fea19ea7ee5a885c67ae1b24a1d04f03f07"
  "macipk.3f3890257865c26a72fee16d44fac756ddc24ea02cb5377ae17595d17f21319f"
  "macipk.dc7e3e0610296275cc0ee7403b8f16620c82e9d8c55f389436a1158ba006b721"
)

user_privkeys=(
  "macisk.0ab0281365e01cff60afc62310daec765e590487bf989a7c4986ebc3fd49895e"
  "macisk.8ea96f332c48f4d76933ad8be1e348015623bc39204a57b771c2b570e7518b78"
  "macisk.ee804108355aa60cf4724ce883bfbb4613c098deaf128e6f48a1419ea46237ad"
)

node build/ts/index.js signup --pubkey ${user_pubkeys[0]}
node build/ts/index.js isRegisteredUser --pubkey ${user_pubkeys[0]} --quiet false
node build/ts/index.js publish --pubkey ${user_pubkeys[0]} --privkey ${user_privkeys[0]} --state-index 1 --vote-option-index $vote_option_index_1 --new-vote-weight 1 --nonce 1 --poll-id 0

node build/ts/index.js signup --pubkey ${user_pubkeys[1]} 
node build/ts/index.js isRegisteredUser --pubkey ${user_pubkeys[1]} --quiet false
node build/ts/index.js publish --pubkey ${user_pubkeys[1]} --privkey ${user_privkeys[1]} --state-index 2 --vote-option-index $vote_option_index_2 --new-vote-weight 1 --nonce 1 --poll-id 0

node build/ts/index.js signup --pubkey ${user_pubkeys[2]}
node build/ts/index.js isRegisteredUser --pubkey ${user_pubkeys[2]} --quiet false
node build/ts/index.js publish --pubkey ${user_pubkeys[2]} --privkey ${user_privkeys[2]} --state-index 3 --vote-option-index $vote_option_index_3 --new-vote-weight 1 --nonce 1 --poll-id 0

# Time travel and merge data
node build/ts/index.js timeTravel -s 1000
node build/ts/index.js mergeSignups --poll-id 0
node build/ts/index.js mergeMessages --poll-id 0

# Generate local state and proofs
node build/ts/index.js genLocalState --poll-id 0 --output localState.json --privkey macisk.1751146b59d32e3c0d7426de411218172428263f93b2fc4d981c036047a4d8c0 --blocks-per-batch 50
node build/ts/index.js genProofs --privkey macisk.1751146b59d32e3c0d7426de411218172428263f93b2fc4d981c036047a4d8c0 --poll-id 0 --process-zkey ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey --tally-zkey ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey --tally-file tally.json --output proofs/ -tw ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_js/TallyVotes_10-1-2_test.wasm -pw ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_js/ProcessMessages_10-2-1-2_test.wasm -w true -q false

# Prove on-chain and verify
node build/ts/index.js proveOnChain --poll-id 0 --proof-dir proofs/ --subsidy-enabled false
node build/ts/index.js verify --poll-id 0 --subsidy-enabled false --tally-file tally.json