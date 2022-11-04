import { ethers, deployments } from "hardhat";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Jellies } from "../typechain-types/contracts/Jellies";

chai.use(chaiAsPromised);

describe("Maps", () => {
  let deployer: SignerWithAddress, alice: SignerWithAddress;
  let contract: Jellies;

  beforeEach(async () => {
    [deployer, alice] = await ethers.getSigners();
    await deployments.fixture(["_JellyMaps"]);
    contract = await ethers.getContract("JellyMaps");
    await contract.connect(alice).mintMapNFT(1);
  });

  it("Should mint a map", async () => {
    const aliceInitBalance = await contract.balanceOf(alice.address);
    await contract.connect(alice).mintMapNFT(2);
    const aliceNewBalance = await contract.balanceOf(alice.address);
    expect(Number(aliceNewBalance)).to.be.equal(Number(aliceInitBalance) + 1);
  });

  it("Should return a token URI", async () => {
    await contract.connect(alice).mintMapNFT(1);
    const tokenUri = await contract.tokenURI(1);
    expect(tokenUri).to.be.equal("data:application/json;base64,eyJuYW1lIjogIkRlc2VydDogSmVsbHkgTWFwIE5GVCAjIDEiLCAiZGVzY3JpcHRpb24iOiAiVW5sb2NrIGEgbmV3IGFyZWEgb2YgdGhlIG1ldGF2ZXJzZSBmb3IgeW91ciBqZWxseSB0byBleHBsb3JlISIsICJpbWFnZSI6ICJodHRwczovL2dhdGV3YXkucGluYXRhLmNsb3VkL2lwZnMvUW1XcHZIaW8xTlg0U2VMVFBuU241ZnNDM2hHUll0YVVLNHo0SDh0N2pnMk1mcS8yLnBuZyJ9")
  });

  it("Should get all jellies", async () => {
    const characters = await contract.getAllDefaultMaps();
    expect(characters.length).to.be.equal(4);
  });

  it("Should get all tokens for owner", async () => {
    const tokens = await contract.getUserTokens(alice.address);
    const aliceBalance = await contract.balanceOf(alice.address);
    expect(tokens.length).to.be.equal(Number(aliceBalance));
  })
});