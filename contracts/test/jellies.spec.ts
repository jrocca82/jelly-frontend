import { ethers, deployments } from "hardhat";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Jellies } from "../typechain-types/contracts/Jellies";

chai.use(chaiAsPromised);

describe("Jellies", () => {
  let deployer: SignerWithAddress, alice: SignerWithAddress;
  let contract: Jellies;

  beforeEach(async () => {
    [deployer, alice] = await ethers.getSigners();
    await deployments.fixture(["_Jellies"]);
    contract = await ethers.getContract("Jellies");
    await contract.connect(alice).mintJellyNFT(1);
    await contract.connect(alice).mintJellyNFT(2);
  });

  it("Should mint a jelly", async () => {
    const aliceInitBalance = await contract.balanceOf(alice.address);
    await contract.connect(alice).mintJellyNFT(2);
    const aliceNewBalance = await contract.balanceOf(alice.address);
    expect(Number(aliceNewBalance)).to.be.equal(Number(aliceInitBalance) + 1);
  });

  it("Should return a token URI", async () => {
    await contract.connect(alice).mintJellyNFT(1);
    const tokenUri = await contract.tokenURI(1);
    expect(tokenUri).to.be.equal("data:application/json;base64,eyJuYW1lIjogIkdyZWVuIEplbGx5IE5GVCAjOiAyIiwgImRlc2NyaXB0aW9uIjogIkEgY3V0ZSBqZWxseSBORlQgdGhhdCBjYW4gcnVuIGFuZCBqdW1wISIsICJpbWFnZSI6ICJodHRwczovL2dhdGV3YXkucGluYXRhLmNsb3VkL2lwZnMvUW1OUTNtc0NqV0M5aFpyOVdERjV1YWJObXgzR3U3dVB3RmFtWmhXY3RNa2RvNC8yLnBuZyIsICJhdHRyaWJ1dGVzIjogWyB7ICJ0cmFpdF90eXBlIjogInNwZWVkIiwgInZhbHVlIjogMX0sIHsgInRyYWl0X3R5cGUiOiAiSnVtcCBIZWlnaHQiLCAidmFsdWUiOiAyfSBdfQ==")
  });

  it("Should get all jellies", async () => {
    const characters = await contract.getAllDefaultJellies();
    expect(characters.length).to.be.equal(6);
  });

  it("Should get all tokens for owner", async () => {
    const tokens = await contract.getUserTokens(alice.address);
    const aliceBalance = await contract.balanceOf(alice.address);
    expect(tokens.length).to.be.equal(Number(aliceBalance));
  })
});