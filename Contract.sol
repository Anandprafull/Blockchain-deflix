// SPDX-License-Identifier: Prafull
pragma solidity ^0.8.24;

import "@openzeppelin/contracts@4.6.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.6.0/token/ERC721/extensions/ERC721Enumerable.sol";//for enumeration functionality
import "@openzeppelin/contracts@4.6.0/token/ERC721/extensions/ERC721URIStorage.sol";//support for token metadata (URIs)
import "@openzeppelin/contracts@4.6.0/utils/Counters.sol";

contract deFlix is ERC721, ERC721Enumerable, ERC721URIStorage{
   // to create and manage token IDs.
   using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    //for maxm comments and all!!
    uint256 MAX_SUPPLY = 5000;

    constructor() ERC721("deFlix", "DFX") {}

    function safeMint(address to, string memory uri) public{
        // Get the current token ID from the counter.
        uint256 tokenId = _tokenIdCounter.current();
        // Ensuring that the total minted tokens do not exceed the maximum supply.
        require(tokenId <= MAX_SUPPLY, "Sorry, Comments exceeded the limit!!");
        // Increment the token ID counter for the next minted token.
        _tokenIdCounter.increment();
        // Mint the NFT and assign it to the specified recipient.
        _safeMint(to, tokenId);
        // Set the metadata URI for the minted NFT.
        _setTokenURI(tokenId, uri);
    }

    //  overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    // Calling the overridden function from ERC721 and ERC721URIStorage to get the metadata URI for a token.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
