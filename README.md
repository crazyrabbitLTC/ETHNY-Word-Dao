# ETHNY-Word-Dao

Storage is expensive on the blockchain. We want to build a canonical contract to store all words referenced by an integer. So, instead of putting an entire string in your contract like "hello world", you can reference two integers: 1,4 (there corresponding keys in the mapping).

This repo consists of three contracts:

- WordDAOToken: Issues a coin for anyone contributing a word
- Registry: Stores all the words in uint32 -> bytes32
- Manager: Owner of both of the above contract and interface to access them. Charges a tiny fee to get a word back, which is planned to go to owners of WordDAOToken (last part not implemented yet).

## Instructions to get this running

Terminal Window 1:

```bash
# npm requirements
npm install -g truffle
npm install -g zos
npm install

# Run ganache in one terminal
ganache-cli --deterministic
```

Terminal Window 2:

```bash
truffle migrate
truffle console --network development
> let managerInstance = await Manager.at("0xCfEB869F69431e42cdB54A4F4f105C19C080A601")
> managerInstance.getDictionarySize()
<BN 1>
> let txn = await managerInstance.addBytes(web3.utils.asciiToHex("Ethereum"))
> let word = await managerInstance.getBytesByKey(2)
0x33834030300000000 \\ returns in bytes (maybe different than what you put into addBytes)
```

## TODOs

- Upgrade Manager to withdraw Eth for WordDAOTokens
- Test withdrawl
