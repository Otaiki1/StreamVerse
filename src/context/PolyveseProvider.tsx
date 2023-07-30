import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Polyverse from "./Polyverse.json";
import { useAddress } from "@thirdweb-dev/react";
import { useDataverse } from "./DataverseProvider";

interface PolyverseChildrenNode {
  children: React.ReactNode;
}
// Create the context
const PolyverseContext = createContext<any>(null);

// Custom hook to access the context
export const usePolyverse = () => useContext(PolyverseContext);

// Provider component to wrap your app and provide access to the contract functions
export const PolyverseProvider: React.FC<PolyverseChildrenNode> = ({
  children,
}) => {
  const [polyverseContract, setPolyverseContract] = useState<any>(null);
  const [polyverseInstance, setPolyverseInstance] = useState<any>(null);
  const [allCreators, setAllCreators] = useState<any[]>([]);
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [allTickets, setAllTickets] = useState<any[]>([]);

  // Initialize the contract instance
  useEffect(() => {
    const initializeContract = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x06Eed8DFeF03dBB02bd5B8C76E8d0a1B976CBB0A";
       console.log(signer)
        const contract = new ethers.Contract(
          contractAddress,
          Polyverse.abi,
          signer
        );
        const instance = contract.connect(signer);

        setPolyverseContract(contract);
        setPolyverseInstance(instance);
      } catch (error) {
        console.error("Failed to initialize contract:", error);
      }
    };

    initializeContract();
  }, []);

  // Function to fetch all creators from the contract
  const fetchAllCreators = async () => {
    try {
      const creators = await polyverseInstance.getAllCreators();
      const parsedCreator = await creators.map((item: any, i: any) => ({
        owner: item.owner,
        image: item.imageIpfs,
        cost: ethers.utils.formatEther(item.subscriptionFee),
        category: item.category,
        bio: item.bio,
        pid: i + 1,
        name: item.name,
        balance: item.balance.toNumber(),
      }));
      setAllCreators(parsedCreator);
      console.log(creators);
    } catch (error) {
      console.error("Failed to fetch creators:", error);
    }
  };

  // Function to fetch all events from the contract
  const fetchAllEvents = async () => {
    try {
      const events = await polyverseInstance.getAllEvents();
      setAllEvents(events);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  // Function to fetch all tickets from the contract
  const fetchAllTickets = async () => {
    try {
      const tickets = await polyverseInstance.getAllTickets();
      setAllTickets(tickets);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    }
  };

 
  // Function to add a creator
  const addCreator = async (
    name: string,
    imagepath: string,
    category: string,
    bio: string,
    subscriptionFee: ethers.BigNumber
  ) => {
    try {
      await polyverseInstance.addCreator(
        name,
        imagepath,
        category,
        bio,
        subscriptionFee
      );
      // Optionally fetch all creators again after adding a new one
      fetchAllCreators();
    } catch (error) {
      console.error("Failed to add creator:", error);
    }
  };

  // Function to list an event
  const listEvent = async (
    name: string,
    cost: number,
    maxTickets: number,
    date: string,
    time: string,
    location: string
  ) => {
    try {
      await polyverseInstance.listEvent(
        name,
        cost,
        maxTickets,
        date,
        time,
        location
      );
      // Optionally fetch all events again after listing a new one
      fetchAllEvents();
    } catch (error) {
      console.error("Failed to list event:", error);
    }
  };

  // Define the contract functions you want to expose in the context
  const contextValue = {
    polyverseContract,
    polyverseInstance,
    allCreators,
    allEvents,
    allTickets,
    fetchAllCreators,
    fetchAllEvents,
    fetchAllTickets,
    addCreator,
    listEvent,
  };

  return (
    <PolyverseContext.Provider value={contextValue}>
      {children}
    </PolyverseContext.Provider>
  );
};
