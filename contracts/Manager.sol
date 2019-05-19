pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";
import "./WordDAOToken.sol";
import "./Registry.sol";

contract Manager is Initializable {

  // address of the owner
  address payable public owner;
  uint256 public price;

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
    registryInstance.addString("hello");

    address[] memory addresses = new address[](1);
    addresses[0] = address(this);

    // initialize WordDAOToken
    wordDAOTokenInstance.initialize(
      "WordDAOToken",
      "WORD",
      uint8(0), // 0 decimals
      uint256(0), // 0 initial supply
      address(this), // initialHolder is self
      addresses, // minters limited to self
      addresses); // pausers limited to self

      price = 0.000001 ether;
  }

  // Given a key, returns a word
  function getBytesByKey(uint32 key) public payable
    returns (bytes32 word) {
      require(msg.value > price, "Not enough payment included");
      word = registryInstance.getBytesByKey(key);
    }

  function getIndex(bytes32 byteString) public
    returns (uint32) {
      return registryInstance.getKeyByBytes(byteString);
    }

  // Given a word, if it doesn't exist
  function addBytes(bytes32 byteString) public
    returns (uint32 key) {
      // add word to dictionary
      key = registryInstance.addBytes(byteString);

      // mint a new token for sender
      // TODO: perhaps better to give them number of tokens proportionate to the length of the word
      // that they added?
      wordDAOTokenInstance.mint(msg.sender, 1);
    }

  function getDictionarySize() public view
    returns (uint32 size) {
      size = registryInstance.getCount();
    }

  function withdraw(uint amount) public
    returns(bool) {
    require(msg.sender == owner, "Only owner may call this");
    require(amount <= address(this).balance, "Amount larger than balance");
    owner.transfer(amount);
    return true;
  }

  // fallback payable function
  function () external payable {

  }
}