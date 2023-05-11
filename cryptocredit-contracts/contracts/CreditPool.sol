// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CreditPool is Ownable {
    IERC20 private stablecoin;
    uint256 public totalFunds;
    uint256 public interestRate;
    uint256 public repaymentPeriod;

    event CreditRequested(uint256 tokenId, address user, uint256 amount);
    event CreditRepaid(uint256 tokenId, address user, uint256 amount);

    constructor(
        address stablecoinAddress,
        uint256 _interestRate,
        uint256 _repaymentPeriod
    ) {
        stablecoin = IERC20(stablecoinAddress);
        interestRate = _interestRate;
        repaymentPeriod = _repaymentPeriod;
    }

    function addFunds(uint256 amount) public {
        stablecoin.transferFrom(msg.sender, address(this), amount);
        totalFunds += amount;
    }

    function requestCredit(
        uint256 tokenId,
        address user,
        uint256 amount
    ) public onlyOwner {
        require(totalFunds >= amount, "Insufficient funds in the pool.");
        totalFunds -= amount;

        uint256 interest = (amount * interestRate) / 100;
        totalFunds += interest;

        stablecoin.transfer(user, amount);

        emit CreditRequested(tokenId, user, amount);
    }

    function repayCredit(
        uint256 tokenId,
        address user,
        uint256 amount
    ) public onlyOwner {
        stablecoin.transferFrom(user, address(this), amount);
        totalFunds += amount;

        emit CreditRepaid(tokenId, user, amount);
    }

    function setInterestRate(uint256 newInterestRate) public onlyOwner {
        interestRate = newInterestRate;
    }

    function setRepaymentPeriod(uint256 newRepaymentPeriod) public onlyOwner {
        repaymentPeriod = newRepaymentPeriod;
    }
}
