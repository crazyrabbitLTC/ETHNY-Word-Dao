pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";
import "./WordDAOToken.sol";
import "./Registry.sol";

contract Manager is Initializable {

  // address of the owner
  address public owner;

  // Registry contract instance on chain
  Registry public registryInstance;

  // WordDAOToken contract instance on chain
  WordDAOToken public wordDAOTokenInstance;

  event LogAddress (
    address temp
  );

  // Initializer, requires address for Registry and WordDAOToken
  function initialize(address registryAddress, address wordDAOTokenAddress) public initializer {
    owner = msg.sender;
    wordDAOTokenInstance = WordDAOToken(wordDAOTokenAddress);
    registryInstance = Registry(registryAddress);

    //emit LogAddress(wordDAOTokenAddress);
    //emit LogAddress(registryAddress);
    // initialize Registry
    registryInstance.initialize();
    registryInstance.addString("hello");

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
  function getBytesByKey(uint32 key) public view
    returns (bytes32 word) {
      word = registryInstance.getBytesByKey(key);
    }

  function getIndex(bytes32 byteString) public
    returns (uint32) {
      return registryInstance.getKeyByBytes(byteString);
    }

  // Given a word, if it doesn't exist
  function addBytes(bytes32 byteString) public
    returns (uint32) {
      return registryInstance.addBytes(byteString);
    }
}