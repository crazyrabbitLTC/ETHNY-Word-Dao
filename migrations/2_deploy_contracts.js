const WordDAOToken = artifacts.require("./WordDAOToken.sol");
const Registry = artifacts.require("./Registry.sol");
const Manager = artifacts.require("./Manager.sol");

module.exports = async function(deployer) {
  wordDAOTokenInstance = await deployer.deploy(WordDAOToken);
  registryInstance = await deployer.deploy(Registry);
  managerInstance = await deployer.deploy(Manager);

  await managerInstance.initialize(Registry.address, WordDAOToken.address);
};
