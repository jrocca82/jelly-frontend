// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./libraries/Base64.sol";

import "hardhat/console.sol";

contract Jellies is ERC721 {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

   struct JellyAttributes {
    uint tokenId;
    uint characterIndex;
    string name;
    string imageURI;        
    uint speed;
    uint jumpHeight;
  }

  JellyAttributes[] defaultJellies;
  mapping(uint256 => JellyAttributes) public nftHolderAttributes;
  mapping(address => JellyAttributes[]) public userTokens;

  event JellyNFTMinted(address sender, uint256 tokenId, uint256 characterIndex);

  constructor(
    string[] memory characterNames,
    string[] memory characterImageURIs,
    uint[] memory characterSpeed,
    uint[] memory characterJumpHeight
  ) ERC721("Jellies", "JLLY")
  {
    for(uint i = 0; i < characterNames.length; i += 1) {
      defaultJellies.push(JellyAttributes({
        tokenId: 0,
        characterIndex: i,
        name: characterNames[i],
        imageURI: characterImageURIs[i],
        speed: characterSpeed[i],
        jumpHeight: characterJumpHeight[i]
      }));

      JellyAttributes memory c = defaultJellies[i];
      console.log("Done initializing %s, img %s", c.name, c.imageURI);

    }
    _tokenIds.increment();
  }

  function mintJellyNFT(uint _characterIndex) external {
    // Get current tokenId (starts at 1)
    uint256 newItemId = _tokenIds.current();

    // Map the tokenId => their character attributes
    nftHolderAttributes[newItemId] = JellyAttributes({
      tokenId: newItemId,
      characterIndex: _characterIndex,
      name: defaultJellies[_characterIndex].name,
      imageURI: defaultJellies[_characterIndex].imageURI,
      speed: defaultJellies[_characterIndex].speed,
      jumpHeight: defaultJellies[_characterIndex].jumpHeight
    });

    console.log("Minted NFT w/ tokenId %s and index %s", newItemId, _characterIndex);
    userTokens[msg.sender].push(nftHolderAttributes[newItemId]);

    emit JellyNFTMinted(msg.sender, newItemId, _characterIndex);
    _tokenIds.increment();
    
    _safeMint(msg.sender, newItemId);
  }

  function getUserTokens(address user) public view returns (JellyAttributes[] memory){
    return userTokens[user];
  }

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
      JellyAttributes memory charAttributes = nftHolderAttributes[_tokenId];

      string memory strSpeed = Strings.toString(charAttributes.speed);
      string memory strJumpHeight = Strings.toString(charAttributes.jumpHeight);

      string memory json = Base64.encode(
        abi.encodePacked(
          '{"name": "',
          charAttributes.name,
          ' NFT #: ',
          Strings.toString(_tokenId + 1),
          '", "description": "A cute jelly NFT that can run and jump!", "image": "',
          charAttributes.imageURI,
          '", "attributes": [ { "trait_type": "speed", "value": ',strSpeed,'}, { "trait_type": "Jump Height", "value": ',
          strJumpHeight,'} ]}'
        )
      );

      string memory output = string(
        abi.encodePacked("data:application/json;base64,", json)
      );
      
      return output;
  }

    function getAllDefaultJellies() public view returns (JellyAttributes[] memory) {
      return defaultJellies;
    }
}