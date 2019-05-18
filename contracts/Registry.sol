pragma solidity ^0.5.0;

contract Registry {

  // Address of the manager contract
  // Only one allowed to call
  address public manager;

  // Creates mapping to store integers to strings
  /*
  TODO: Consider multiple structures to optimize
  mapping(uint8 => string) public int8ToWords;
  mapping(uint16 => string) public int16ToWords;
  mapping(uint24 => string) public int24ToWords;
  mapping(uint32 => string) public int32ToWords;
  */
  mapping(uint32 => string) public words;

  // Keeps track of next slot to use to insert word
  uint32 nextEntry;

  // Creates a new instance with address as owner
  function initialize() public {
    manager = msg.sender;
    nextEntry = 1; // Sets nextEntry to 1 (instead of 0, easier for comparison later)
  }

  function compareStrings (string memory a, string memory b) public pure
    returns (bool) {
      return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
  }

  function findWord(string memory word) public view returns (uint32) {
    for (uint32 i = 1; i < nextEntry; i++) {
        if (compareStrings(words[i], word) == true) {
          return i;
        }
    }
    // TODO: is 0 the best thing to return?
    return uint32(0);
  }

  function addWord(string memory word) public
    returns (uint32) {
    // Check that call came from manager
    require(msg.sender == manager, "Only manager can add words");

    // Check that word doesn't exist already
    require(findWord(word) == uint32(0), "Word already in dictionary");

    // Add word
    words[nextEntry] = word;
    nextEntry += 1;
    return nextEntry-1;
  }
}