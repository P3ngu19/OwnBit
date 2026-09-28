// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract OwnBitToken {
    string public name = "OwnBit Property Token";
    string public symbol = "OBT";
    uint8 public decimals = 0;

    uint256 public totalSupply;

    address public owner;

    mapping(address => uint256) private balances;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    event TokensIssued(
        address indexed investor,
        uint256 amount
    );

    constructor(uint256 initialSupply) {
        owner = msg.sender;
        totalSupply = initialSupply;
        balances[msg.sender] = initialSupply;

        emit Transfer(
            address(0),
            msg.sender,
            initialSupply
        );
    }

    function balanceOf(address account)
        public
        view
        returns (uint256)
    {
        return balances[account];
    }

    function transfer(
        address to,
        uint256 amount
    ) public returns (bool) {
        require(
            balances[msg.sender] >= amount,
            "Insufficient token balance"
        );

        require(
            to != address(0),
            "Invalid recipient"
        );

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(
            msg.sender,
            to,
            amount
        );

        return true;
    }

    function issueTokens(
        address investor,
        uint256 amount
    ) public returns (bool) {
        require(
            msg.sender == owner,
            "Only owner can issue tokens"
        );

        require(
            investor != address(0),
            "Invalid investor"
        );

        require(
            amount > 0,
            "Amount must be greater than zero"
        );

        balances[investor] += amount;
        totalSupply += amount;

        emit Transfer(
            address(0),
            investor,
            amount
        );

        emit TokensIssued(
            investor,
            amount
        );

        return true;
    }
}