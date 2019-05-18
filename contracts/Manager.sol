pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";
import "./wordDAOToken.sol";
import "./Registry.sol";

contract Manager is Initializable {

  // address of the owner
  address public owner;

  // Registry contract instance on chain
  Registry public registryInstance;

  // WordDAOToken contract instance on chain
  WordDAOToken public wordDAOTokenInstance;

  // Initializer, requires address for Registry and WordDAOToken
  function initialize(address registryAddress, address wordDAOTokenAddress) public initializer {
    owner = msg.sender;
    wordDAOTokenInstance = WordDAOToken(wordDAOTokenAddress);
    registryInstance = Registry(registryAddress);

    // initialize Registry
    registryInstance.initialize();
    
    address[] memory addresses = new address[](1);
    addresses[0] = address(this);
    
    // initialize WordDAOToken
    wordDAOTokenInstance.initialize(
      "WordDAOToken",
      "WDT",
      uint8(0), // 0 decimals
      uint256(1000000), // 0 initial supply
      address(this), // initialHolder is self
      addresses, // minters limited to self
      addresses); // pausers limited to self
  }

  // Given a key, returns a word
  function getWord(uint32 key) public view
    returns (string memory word) {
      word = registryInstance.getWordAtKey(key);
    }


  // Given a word, if it doesn't exist
  function setWord(string memory word) public
    returns (uint32 key) {
      key = registryInstance.addWord(word);
    }

}