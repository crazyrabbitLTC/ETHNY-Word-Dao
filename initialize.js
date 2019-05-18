// Initialize contracts
const contract = require("truffle-contract");

const wordDAOTokenArtifacts = require("./build/contracts/WordDAOToken.json");
const WordDAOToken = contract(wordDAOTokenArtifacts);
WordDAOToken.setProvider(web3.currentProvider);

const registryArtifacts = require("./build/contracts/Registry.json");
const Registry = contract(registryArtifacts);
Registry.setProvider(web3.currentProvider);

const managerArtifacts = require("./build/contracts/Registry.json");
const Manager = contract(managerArtifacts);
Manager.setProvider(web3.currentProvider);

module.exports = async function(callback) {
  const accounts = await web3.eth.getAccounts();

  const wordDAOTokenInstance = await WordDAOToken.at(
    "0x630589690929E9cdEFDeF0734717a9eF3Ec7Fcfe"
  );
  const registryInstance = await Registry.at(
    "0x0E696947A06550DEf604e82C26fd9E493e576337"
  );
  const managerInstance = await Manager.at(
    "0xDb56f2e9369E0D7bD191099125a3f6C370F8ed15"
  );

  console.log("Found instances of contracts");

  managerInstance.initialize(wordDAOTokenInstance, registryInstance);

  console.log("Initialized manager");

  /*
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
  */
  callback();
};
