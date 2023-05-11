// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CreditCardToken is ERC1155, Ownable {
    constructor() ERC1155("https://api.example.com/credit_card_tokens/{id}.json") {}

    function mint(
        address account,
        uint256 tokenId,
        uint256 amount
    ) public onlyOwner {
        _mint(account, tokenId, amount, "");
    }

    function burn(
        address account,
        uint256 tokenId,
        uint256 amount
    ) public onlyOwner {
        _burn(account, tokenId, amount);
    }

    function setURI(string memory newURI) public onlyOwner {
        _setURI(newURI);
    }
}
