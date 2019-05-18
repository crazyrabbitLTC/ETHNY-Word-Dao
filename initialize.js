// Initialize contracts
const contract = require("truffle-contract");

const wordDAOTokenArtifacts = require("./build/contracts/WordDAOToken.json");
const WordDAOToken = contract(wordDAOTokenArtifacts);
WordDAOToken.setProvider(web3.currentProvider);

const registryArtifacts = require("./build/contracts/Registry.json");
const Registry = contract(registryArtifacts);
Registry.setProvider(web3.currentProvider);

module.exports = async function(callback) {
  const accounts = await web3.eth.getAccounts();

  const wordDAOTokenInstance = await WordDAOToken.at(
    "0x26b4AFb60d6C903165150C6F0AA14F8016bE4aec"
  );
  const registryInstance = await Registry.at(
    "0x630589690929E9cdEFDeF0734717a9eF3Ec7Fcfe"
  );

  console.log("Found both instances of contracts");

  // Initialize WordDAOToken contract
  wordDAOTokenInstance.initialize(
    "WordDAOToken",
    "WDT",
    0,
    1000000,
    accounts[0],
    [accounts[0]],
    [accounts[0]]
  );
  console.log("Initialized WDT");
  const supply = await wordDAOTokenInstance.totalSupply();
  console.log("WDT Supply: ", supply);

  // Initialize WordDAOToken contract
  registryInstance.initialize();
  console.log("Initialized Registry");

  await callback();
};
