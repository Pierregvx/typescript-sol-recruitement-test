// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract nft is ERC721URIStorage{
    uint256 counter=1;
    constructor() ERC721("okok","nft"){}
    
    function mint(string memory _tokenURI) public{
        _safeMint(msg.sender,counter);
        _setTokenURI(counter, _tokenURI);
        counter++;
    }


    
}

