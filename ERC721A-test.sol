// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts@4.6.0/access/Ownable.sol";

contract deFlix is ERC721A, Ownable {
    // to create and manage token IDs.
    event ReviewUploaded(uint256 indexed tokenId, string review);

    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721A("deFlix", "DFX") {}

    function mintMovies(uint256 quantity) public onlyOwner {
        _safeMint(msg.sender, quantity);
    }

    function uploadReview(uint256 tokenId, string memory _review) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _tokenURIs[tokenId] = _review;
        emit ReviewUploaded(tokenId, _review);
    }

    function getReview(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }
}
