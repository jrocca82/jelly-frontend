import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const args = {
		mapNames: ["Forest", "Desert", "Graveyard", "Winter"],
		mapImageURIs: [
			"https://gateway.pinata.cloud/ipfs/QmWpvHio1NX4SeLTPnSn5fsC3hGRYtaUK4z4H8t7jg2Mfq/1.png",
      "https://gateway.pinata.cloud/ipfs/QmWpvHio1NX4SeLTPnSn5fsC3hGRYtaUK4z4H8t7jg2Mfq/2.png",
      "https://gateway.pinata.cloud/ipfs/QmWpvHio1NX4SeLTPnSn5fsC3hGRYtaUK4z4H8t7jg2Mfq/3.png",
      "https://gateway.pinata.cloud/ipfs/QmWpvHio1NX4SeLTPnSn5fsC3hGRYtaUK4z4H8t7jg2Mfq/4.png"
		]
	};

  const contract = await deploy("JellyMaps", {
    from: deployer,
    args: [args.mapNames, args.mapImageURIs],
    log: true
  });

  console.log(`Successfully deployed contract to ${contract.address}`);
};

export default func;
func.tags = ["testbed", "_JellyMaps"];