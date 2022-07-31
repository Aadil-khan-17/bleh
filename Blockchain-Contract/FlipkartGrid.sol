// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.7.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.0/utils/Counters.sol";

contract FlipkartGrid is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // Mapping from token ID to warranty start date
    mapping(uint256 => uint256) private _startWarranty;

    // Mapping from token ID to warranty period
    mapping(uint256 => uint256) private _warrantyPeriod;

    // Mapping from token ID to replacement Date
    mapping(uint256 => uint256) private _replacementDate;

    constructor() ERC721("FlipkartGrid", "MTK") {}

    function getTime(uint256 startwarr, uint256 warrPeriod) public view returns(uint){
        return startwarr+warrPeriod;
    }

    function replacement(uint256 tid) public returns(uint256){
        uint256 end=getTime(_startWarranty[tid],_warrantyPeriod[tid]);
        require(block.timestamp < end,"Can't replace!! Out of Warranty");
        _replacementDate[tid]=block.timestamp;
        return 1;
    }

    function transfer(address from, address to, uint256 tid) public{
        uint256 end=getTime(_startWarranty[tid],_warrantyPeriod[tid]);
        require(block.timestamp < end,"Can't Transfer!! Out of Warranty");
        _transfer(from,to,tid);
        // task
    }

    // safe mint mei randomly 0 se 10 nfts create krni hai jinki tid 9999 se start ho
    // apply expiry discount() 
    // 1) token id with user
    // 2) token id and discount token id (5 digits) (token id === given id)

    function applyExpiryDiscount(uint256 tid) public{
        address owner = ownerOf(tid);
        require(owner==msg.sender,"Not a valid user");
        uint256 val=tid*10000;
        uint256 ab=0;
        for(uint256 i=0;i<10;i++){
            // address owner = _owners[val+i];
            if(_exists(val+i)){
                ab++;
                _burn(val+i);
            }
        }
        _warrantyPeriod[tid]=_warrantyPeriod[tid]+(ab*30*24*60*60);

    }

    function warrantyProvider(uint256 tid) public view returns(uint256){
        require(_exists(tid),"Null Address");
        return _warrantyPeriod[tid];
    }

    function safeMint(address to, uint256 tokenId, uint256 warrantyDuration, string memory uri) public onlyOwner {
        // uint256 tokenId = _tokenIdCounter.current();
        // _tokenIdCounter.increment();
        _startWarranty[tokenId]=block.timestamp;
        _warrantyPeriod[tokenId]=warrantyDuration;
        _safeMint(to, tokenId);
        uint256 sz=tokenId%10;
        uint256 newtid=tokenId*10000;
        for(uint256 i = 0; i<sz; i++){
            _safeMint(to,newtid+i);
        }
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory){
        return super.tokenURI(tokenId);
    }
}
