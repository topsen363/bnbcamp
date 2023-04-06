// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract V2 is Initializable {

    uint256 public constant VERSION = 2;
    uint public number;
    
    function initialize(uint _number) public initializer {
        number = _number;
    }

    function setNumber(uint _newNumber) external {
       number += _newNumber;
    }

    function decrease(uint _newNumber) external {
       number -= _newNumber;
    }

}