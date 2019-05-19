pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";

contract Registry is Initializable {

  // Address of the manager contract
  address public manager;

  // Creates mapping to store integers to strings
  mapping(uint32 => bytes32) public intToBytes;
  mapping(bytes32 => uint32) public bytesToInt;

  // Keeps track of next slot to use to insert word
  uint32 public nextEntry;

  // Creates a new instance with address as owner
  function initialize() public initializer {
    manager = msg.sender;
    nextEntry = uint32(1); // Sets nextEntry to 1 (instead of 0, easier for comparison later)
  }

  function getManager() public view returns (address){
    return manager;
  }

  // Use this function to add a byteString to dictionary
  // Fails if the bytestring already exists
  function addBytes(bytes32 byteString) public returns (uint32) {
    require(msg.sender == manager, "Only manager can add words");
    require(bytesToInt[byteString] == uint32(0), "Bytes already exist");
    intToBytes[nextEntry] = byteString;
    bytesToInt[byteString] = nextEntry;
    nextEntry += 1;
    return nextEntry-1;
  }
  
  // Use this function to lookup a key and get a bytestring
  function getBytesByKey(uint32 key) public view returns (bytes32 byteString) {
    require(msg.sender == manager, "Only manager can add words");
    byteString = intToBytes[key];
    require(byteString.length > 0, "Key doesn't exist");
  }

  function getKeyByBytes(bytes32 byteString) public view returns (uint32 key) {
    require(msg.sender == manager, "Only manager can add words");
    key = bytesToInt[byteString];
    require(key > uint32(0), "Bytestring doesn't exist");
    return key;
  }

  /* Leaving next two functions mostly for testing via remix, since it's hard to enter bytes in its interface */
  function stringToBytes32(string memory source) private pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
        return 0x0;
    }
    assembly {
        result := mload(add(source, 32))
    }
  }

  // Mostly leaving for testing
  function addString(string memory word) public returns (uint32 key) {
      key = addBytes(stringToBytes32(word));
  }
}