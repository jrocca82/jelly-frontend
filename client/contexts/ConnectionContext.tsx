import { ethers, providers } from "ethers";
import React, {
  ReactNode,
  createContext,
  useState,
  useCallback,
} from "react";
import { jellyContractAddress } from "../constants/contractAddresses";
import Jellies from "../constants/abis/Jellies.json";

interface IConnectionContext {
  ethersProvider: ethers.providers.Web3Provider | undefined;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  accounts: string[] | undefined;
  jellyContract: ethers.Contract | undefined;
  error: string | undefined;
}

export const ConnectionContext = createContext({} as IConnectionContext);

export const ConnectionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [ethersProvider, setEthersProvider] =
    useState<ethers.providers.Web3Provider>();
  const [accounts, setAccounts] = useState<string[]>();
  const [jellyContract, setJellyContract] = useState<ethers.Contract>();
  const [error, setError] = useState<string>();

  const connectWallet = useCallback(async () => {
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if(!provider) {
      setError("Please install Metamask!");
      return;
    }
    
    const signer = provider.getSigner();

    await provider.send("eth_requestAccounts", []);

    const accounts = await provider.listAccounts();
    setAccounts(accounts);

    const jellyContract = new ethers.Contract(jellyContractAddress, Jellies.abi, signer);
    setJellyContract(jellyContract);

    setEthersProvider(provider);
  }, []);

  // set states to initial setting when user disconnect from wallet / auth0
  const disconnectWallet = async () => {
    setEthersProvider(undefined);
  };

  return (
    <ConnectionContext.Provider
      value={{
        accounts,
        ethersProvider,
        connectWallet,
        disconnectWallet,
        jellyContract,
        error
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};