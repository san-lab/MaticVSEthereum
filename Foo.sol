pragma solidity ^0.8.0;

contract Foo {
    
    uint256 private _number;
    
    constructor(uint256 number) {
        _number = number;
    }
    
    function getNumber() public view returns(uint256) {
        return _number;
    }
    
    function setNumber(uint256 number) public {
        _number = number;
    }
}