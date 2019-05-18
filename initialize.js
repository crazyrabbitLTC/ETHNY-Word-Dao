let accounts = await web3.eth.getAccounts();

// replace addresses below with addresses in your ganache instance
let wordDAOTokenInstance = await WordDAOToken.at(
  "0x26b4AFb60d6C903165150C6F0AA14F8016bE4aec"
);
let registryInstance = await Regsitry.at(
  "0x630589690929E9cdEFDeF0734717a9eF3Ec7Fcfe"
);

// wordDAOTokenInstance.initialize()
