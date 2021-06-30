// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "./SacemEnPLS.sol";

contract MarketPlaceCPR {
    using Address for address payable;

    SacemEnPLS private _sacem;

    mapping(address => uint256) private _etherBalance;
    
    constructor(address sacemAddress_) {
        _sacem = SacemEnPLS(sacemAddress_);
    }

    function buyNFT(uint256 id) public payable {
        require(_sacem.getApproved(id) == address(this),"SacemEnPLS: Sorry this NFT is not for sell");
        require(msg.value >= _sacem.getPrice(id), "SacemEnPLs: Sorry not enought ethers" );
        uint256 amount = msg.value;
        _etherBalance[_sacem.ownerOf(id)] += amount;
        _sacem.transferFrom(_sacem.ownerOf(id), msg.sender, id);
    }

    function withdraw() public {
        uint256 amount = _etherBalance[msg.sender];
        _etherBalance[msg.sender] = 0;
        payable(msg.sender).sendValue(amount);
    }

    function getEtherBalance() public view returns (uint256) {
        return (_etherBalance[msg.sender]);
    }
}
