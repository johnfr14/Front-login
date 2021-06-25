// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SacemEnPLS is ERC721, AccessControl {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    struct CopyRight {
        bytes32 contentHash;
        string content;
        uint256 timeStamp;
    }

    mapping(uint256 => CopyRight) private _cprContent;
    mapping(bytes32 => uint256) private _cprId;

    constructor() ERC721("Copyright", "CPR") {}

    function createCopyRight(address ownerAddress, string memory content, bytes32 contentHashed) public returns (uint256) {
        require(_cprId[contentHashed] == 0, "SacemEnPLS: sorry this content is already owned by someone");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(ownerAddress, newItemId);
        _cprContent[newItemId] = CopyRight(contentHashed, content, block.timestamp);
        _cprId[contentHashed] = newItemId;

        return newItemId;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function getCPRById(uint256 id) public view returns (CopyRight memory) {
        return _cprContent[id];
    }

    function getCPRByHash(bytes32 contentHashed) public view returns (uint256) {
        return _cprId[contentHashed];
    }
}
