// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CreditCardToken.sol";
import "./CreditPool.sol";

contract CreditCardNFT is ERC721Enumerable, Ownable {
    uint256 private tokenIdCounter;
    address private creditPoolAddress;
    address private creditCardTokenAddress;

    struct CreditCard {
        uint256 tokenId;
        uint256 balance;
        uint256 interestRate;
        uint256 dueDate;
    }

    mapping(uint256 => CreditCard) private creditCards;

    event CreditCardRequested(uint256 tokenId, address requester);

    constructor(address _creditPoolAddress, address _creditCardTokenAddress)
        ERC721("Credit Card NFT", "CCNFT")
    {
        creditPoolAddress = _creditPoolAddress;
        creditCardTokenAddress = _creditCardTokenAddress;
    }

    function requestNewCreditCard(
        uint256 interestRate,
        uint256 dueDate
    ) public {
        require(interestRate > 0, "Interest rate must be greater than 0.");
        require(dueDate > block.timestamp, "Due date must be in the future.");

        tokenIdCounter += 1;
        uint256 newTokenId = tokenIdCounter;

        CreditCard memory newCard = CreditCard(newTokenId, 0, interestRate, dueDate);
        creditCards[newTokenId] = newCard;

        _safeMint(msg.sender, newTokenId);

        emit CreditCardRequested(newTokenId, msg.sender);
    }

    function getCreditCardDetails(uint256 tokenId)
        public
        view
        returns (
            uint256 balance,
            uint256 interestRate,
            uint256 dueDate
        )
    {
        require(_exists(tokenId), "Token does not exist.");

        CreditCard memory card = creditCards[tokenId];
        return (card.balance, card.interestRate, card.dueDate);
    }

    function requestCredit(uint256 tokenId, uint256 amount) public {
        require(_exists(tokenId), "Token does not exist.");
        require(ownerOf(tokenId) == msg.sender, "Caller is not the owner of the token.");

        CreditPool pool = CreditPool(creditPoolAddress);
        CreditCardToken token = CreditCardToken(creditCardTokenAddress);

        pool.requestCredit(tokenId, msg.sender, amount);

        creditCards[tokenId].balance += amount;
        token.mint(msg.sender, tokenId, amount);
    }

    function repayCredit(uint256 tokenId, uint256 amount) public {
        require(_exists(tokenId), "Token does not exist.");
        require(ownerOf(tokenId) == msg.sender, "Caller is not the owner of the token.");
        require(creditCards[tokenId].balance >= amount, "Repayment amount exceeds balance.");

        CreditPool pool = CreditPool(creditPoolAddress);
        CreditCardToken token = CreditCardToken(creditCardTokenAddress);

        pool.repayCredit(tokenId, msg.sender, amount);

        creditCards[tokenId].balance -= amount;
        token.burn(msg.sender, tokenId, amount);
    }

    function setCreditPoolAddress(address newAddress) public onlyOwner {
        creditPoolAddress = newAddress;
    }

    function setCreditCardTokenAddress(address newAddress) public onlyOwner {
        creditCardTokenAddress = newAddress;
    }
}