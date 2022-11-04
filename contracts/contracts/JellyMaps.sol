// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./libraries/Base64.sol";

import "hardhat/console.sol";

contract JellyMaps is ERC721 {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  struct MapAttributes {
    uint tokenId;
    uint levelIndex;
    string name;
    string imageURI;
  }

  MapAttributes[] defaultMaps;
  mapping(uint256 => MapAttributes) public nftHolderAttributes;

  event MapNFTMinted(address sender, uint256 tokenId, uint256 levelIndex);
  mapping(address => MapAttributes[]) public userTokens;

  constructor(string[] memory mapNames, string[] memory mapImageURIs)
    ERC721("JellyMaps", "JYMP")
  {
    for (uint i = 0; i < mapNames.length; i += 1) {
      defaultMaps.push(
        MapAttributes({
          tokenId: 0,
          levelIndex: i,
          name: mapNames[i],
          imageURI: mapImageURIs[i]
        })
      );

      MapAttributes memory c = defaultMaps[i];
      console.log("Done initializing %s, img %s", c.name, c.imageURI);
    }
    _tokenIds.increment();
  }

  function getUserTokens(address user) public view returns (MapAttributes[] memory) {
    return userTokens[user];
  }

  function mintMapNFT(uint _levelIndex) external {
    uint256 newItemId = _tokenIds.current();

    // Map the tokenId => their map attributes
    nftHolderAttributes[newItemId] = MapAttributes({
      tokenId: newItemId,
      levelIndex: _levelIndex,
      name: defaultMaps[_levelIndex].name,
      imageURI: defaultMaps[_levelIndex].imageURI
    });

    console.log(
      "Minted NFT w/ tokenId %s and levelIndex %s",
      newItemId,
      _levelIndex
    );

    userTokens[msg.sender].push(nftHolderAttributes[newItemId]);

    emit MapNFTMinted(msg.sender, newItemId, _levelIndex);
    _tokenIds.increment();

    _safeMint(msg.sender, newItemId);
  }

  function tokenURI(uint256 _tokenId)
    public
    view
    override
    returns (string memory)
  {
    MapAttributes memory mapAttributes = nftHolderAttributes[_tokenId];

    string memory json = Base64.encode(
      abi.encodePacked(
        '{"name": "',
        mapAttributes.name,
        ": Jelly Map NFT # ",
        Strings.toString(_tokenId),
        '", "description": "Unlock a new area of the metaverse for your jelly to explore!", "image": "',
        mapAttributes.imageURI,
        '"}'
      )
    );

    string memory output = string(
      abi.encodePacked("data:application/json;base64,", json)
    );

    return output;
  }

  function getAllDefaultMaps() public view returns (MapAttributes[] memory) {
    return defaultMaps;
  }
}
