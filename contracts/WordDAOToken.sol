pragma solidity ^0.5.0;

import "openzeppelin-eth/contracts/token/ERC20/StandaloneERC20.sol";

contract WordDAOToken is StandaloneERC20 {

  function initialize(
    string memory name, string memory symbol, uint8 decimals, uint256 initialSupply, address initialHolder,
        address[] memory minters, address[] memory pausers
    ) public initializer {
      StandaloneERC20.initialize(name, symbol, decimals, initialSupply, initialHolder, minters, pausers);
  }
}