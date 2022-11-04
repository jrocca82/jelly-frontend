import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const args = {
		characterNames: ["Red Jelly", "Green Jelly", "Yellow Jelly", "Blue Jelly", "Pink Jelly", "Black Jelly"], // Names
		characterImageURIs: [
			"https://gateway.pinata.cloud/ipfs/QmNQ3msCjWC9hZr9WDF5uabNmx3Gu7uPwFamZhWctMkdo4/1.png",
			"https://gateway.pinata.cloud/ipfs/QmNQ3msCjWC9hZr9WDF5uabNmx3Gu7uPwFamZhWctMkdo4/2.png",
      "https://gateway.pinata.cloud/ipfs/QmNQ3msCjWC9hZr9WDF5uabNmx3Gu7uPwFamZhWctMkdo4/3.png",
			"https://gateway.pinata.cloud/ipfs/QmNQ3msCjWC9hZr9WDF5uabNmx3Gu7uPwFamZhWctMkdo4/4.png",
      "https://gateway.pinata.cloud/ipfs/QmNQ3msCjWC9hZr9WDF5uabNmx3Gu7uPwFamZhWctMkdo4/5.png",
			"https://gateway.pinata.cloud/ipfs/QmNQ3msCjWC9hZr9WDF5uabNmx3Gu7uPwFamZhWctMkdo4/6.png",
		],
		characterSpeed: [1, 1, 2, 2, 3, 3],
		characterJumpHeight: [1, 2, 1, 2, 1, 2]
	};

  const contract = await deploy("Jellies", {
    from: deployer,
    args: [args.characterNames, args.characterImageURIs, args.characterSpeed, args.characterJumpHeight],
    log: true
  });

  console.log(`Successfully deployed contract to ${contract.address}`);
};

export default func;
func.tags = ["testbed", "_Jellies"];