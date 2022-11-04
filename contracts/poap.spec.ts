/* eslint-disable camelcase */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { deployments, ethers } from "hardhat";

import { LabrysPoap } from "../typechain-types";

describe("HelloWorld hello tests", () => {
  let Deployer: SignerWithAddress;
  let Alice: SignerWithAddress;
  let Bob: SignerWithAddress;
  let Carol: SignerWithAddress;

  let Poap_Deployer: LabrysPoap;

  beforeEach(async () => {
    const signers = await ethers.getSigners();
    [Deployer, Alice, Bob, Carol] = signers;

    Poap_Deployer = await ethers.getContract("LabrysPoap", Deployer);
  });

  it("Should do a thing", async () => {
    
  });
});