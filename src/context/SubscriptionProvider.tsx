import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

// Import the ABI and contract address
import SubscriptionContractABI from "./SubscriptionContract.json";
import { sendNotification } from "@pushprotocol/restapi/src/lib/payloads";
import { useAddress } from "@thirdweb-dev/react";
import {
  Extension,
  Mode,
  RuntimeConnector,
  WALLET,
} from "@dataverse/runtime-connector";
import { toast } from "react-toastify";

interface PolyverseChildrenNode {
  children: React.ReactNode;
}

// Create a context for the subscription contract
export const SubscriptionContext = createContext<any>(null);

// Provider component to wrap your app and provide access to the contract functions
export const SubscriptionProvider: React.FC<PolyverseChildrenNode> = ({
  children,
}) => {
  const [subscriptionContract, setSubscriptionContract] =
    useState<ethers.Contract>();
  const [allPlans, setAllPlans] = useState<any[]>([]);
  const [userPlans, setUserPlans] = useState<any[]>([]);
  const [allSubscriptions, setAllSubscriptions] = useState<any[]>([]);
  const runtimeConnector = new RuntimeConnector(Extension);
  const subscriptionContractAddress =
    "0x208C9272157776c7a737bE149a6B18b9970017f2";

  const subscribe = async (planId: number, cost: ethers.BigNumber) => {
    try {
      await runtimeConnector?.connectWallet(WALLET.METAMASK);
      const res = await runtimeConnector?.contractCall({
        contractAddress: subscriptionContractAddress,
        abi: SubscriptionContractABI.abi,
        method: "subscribe",
        params: [planId, cost],
        mode: Mode.Write,
      });
      toast.success("Sucessfully Subscribed");
      console.log({ res });
    } catch (error) {
      toast.error("Subscription Failed");
      console.log(error);
    }
  };

  const formatDate = (date: any) => {
    const options: any = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const startDate = new Date(date).toLocaleDateString("en-US", options);
    return startDate;
  };

  // Function to fetch all plans
  const fetchAllPlans = async () => {
    try {
      await runtimeConnector?.connectWallet(WALLET.METAMASK);
      const res = await runtimeConnector?.contractCall({
        contractAddress: subscriptionContractAddress,
        abi: SubscriptionContractABI.abi,
        method: "getAllPlan",
        params: [],
        mode: Mode.Read,
      });
      const parsedPlans = await res.map((item: any, i: any) => ({
        amount: ethers.utils.formatEther(item.amount),
        artist: item.artist,
        month: formatDate(item.frequency.toNumber()),
        name: item.name,
        nftAddress: item.nftAddress,
        pid: i + 1,
      }));
      setAllPlans(parsedPlans);
      return parsedPlans;
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  };

  const filterPlansByAddress = async (address: any) => {
    const result = await fetchAllPlans();
    const filteredPlans = result.filter((plan: any) => plan.artist === address);
    setUserPlans(filteredPlans);
  };

  const address = useAddress();

  useEffect(() => {
    fetchAllPlans();
    //fetchAllSubscriptions()
  }, [address]);

  // Function to check if a subscriber is subscribed to a plan
  const isSubscriber = async (artistAddress: string, planId: number) => {
    try {
      await runtimeConnector?.connectWallet(WALLET.METAMASK);
      const res = await runtimeConnector?.contractCall({
        contractAddress: subscriptionContractAddress,
        abi: SubscriptionContractABI.abi,
        method: "isSubscriber",
        params: [],
        mode: Mode.Read,
      });
      return res;
    } catch (error) {
      console.error("Failed to check subscription:", error);
      return false;
    }
  };

  // Function to make a payment for a subscription plan
  const pay = async (planId: number) => {
    try {
      await subscriptionContract?.pay(planId);
      // Perform any additional actions after payment
    } catch (error) {
      console.error("Failed to make payment:", error);
    }
  };

  // Define the contract functions you want to expose in the context
  const contextValue = {
    subscriptionContract,
    allPlans,
    allSubscriptions,
    fetchAllPlans,
    isSubscriber,
    pay,
    subscribe,
    userPlans,
    filterPlansByAddress,
    setAllPlans,
  };

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Custom hook to easily access the subscription context
export const useSubscription = () => useContext(SubscriptionContext);
