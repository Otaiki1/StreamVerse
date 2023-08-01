import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { createContext, useContext, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

interface StreamerNode {
  children: React.ReactNode;
}

interface StreamerContextType {
  createFlow: (_receiver: string, _flowRate: Number) => Promise<void>;
  deleteFlow: (_receiver: string) => Promise<void>;
  streamerBalance: string;
}

const StreamerContext = createContext<StreamerContextType | null>(null);

export const StreamerProvider = ({ children }: StreamerNode) => {
  const address = useAddress() || "";

  const [streamerBalance, setStreamerBalance] = useState("");

  async function fetchStreamBalance() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const sf = await Framework.create({
        chainId: Number(chainId),
        provider: provider,
      });

      const maticX = await sf.loadSuperToken(
        "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4"
      );
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const balance: any = await maticX.balanceOf({
        account: accounts[0].toString(),
        providerOrSigner: provider,
      });

      setStreamerBalance((balance / 1000000000000000000).toString());
    } catch (error) {
      console.log("balanceerror: " + error);
    }
  }

  async function deleteFlow(_receiver: string) {
    //0.024615460466057584 maticX balance -> 0.005499219 maticX/hour
    //1 maticX balance -> 0.223405083 maticX/hour

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const sf = await Framework.create({
        chainId: Number(chainId),
        provider: provider,
      });

      const signer = provider.getSigner();

      const maticX = await sf.loadSuperToken(
        "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4"
      );
      const superSigner = sf.createSigner({ signer: signer });

      const deleteflow = maticX.deleteFlow({
        sender: await superSigner.getAddress(),
        receiver: _receiver,
      });

      const deleteflowlog = await deleteflow.exec(signer);
    } catch (error) {
      console.log("deleteflowerror: " + error);
    }
  }

  async function createFlow(_receiver: string, _rate: Number) {
    //0.024615460466057584 maticX balance -> 0.005499219 maticX/hour
    const ratePerSeconds = Math.round(
      (Number(_rate) / 3600) * 1000000000000000000
    ).toString();

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const sf = await Framework.create({
        chainId: Number(chainId),
        provider: provider,
      });

      const signer = provider.getSigner();

      const maticX = await sf.loadSuperToken(
        "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4"
      );
      //const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const superSigner = sf.createSigner({ signer: signer });

      const createflow = maticX.createFlow({
        sender: await superSigner.getAddress(),
        receiver: _receiver,
        flowRate: ratePerSeconds,
      });

      const createflowlog = await createflow.exec(signer);

      // setInterval(() => {
      //     if (address.length > 0) {
      //     fetchStreamBalance();
      //     }
      // }, 2500);
    } catch (error) {
      console.log("createflowerror: " + error);
    }
  }

  return (
    <StreamerContext.Provider
      value={{
        createFlow,
        deleteFlow,
        streamerBalance,
      }}
    >
      {children}
    </StreamerContext.Provider>
  );
};

export const useStreamerContext = (): StreamerContextType => {
  const contextValue = useContext(StreamerContext);
  if (contextValue === null) {
    throw new Error(
      "useErrandContext must be used within a StreamVerseProvider"
    );
  }
  return contextValue;
};
