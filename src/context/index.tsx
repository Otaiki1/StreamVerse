import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { Mumbai } from "@thirdweb-dev/chains";
import { useAddress, useMetamask, useSigner } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as PushAPI from "@pushprotocol/restapi";
import { useLocalStorage } from "react-use";
import { ethers } from 'ethers'

interface ProtocolNode {
  children: React.ReactNode;
}

interface PushType {
  signer: PushAPI.SignerType | undefined;
  channelAddress: string;
  userAddress: string;
  onSuccess: () => void | undefined;
  onError?: ((err: Error) => void) | undefined;
  env?: ENV | undefined;
  status: string;
  message: string;
}

interface PolyverseContextType {
  subscribed: boolean | undefined;
  sendNotification: (
    title: string,
    body: string,
    type?: number
  ) => Promise<void>;
  subscribeToNotification: () => Promise<void>;
}

const ProtocolContext = createContext<PolyverseContextType | null>(null);

export const ProtocolProvider = ({ children }: ProtocolNode) => {
  const [storedSubscribed, setStoredSubscribed] = useLocalStorage(
    "subscribed",
    false
  );
  const [subscribed, setSubscribed] = useState<boolean | undefined>(false);
  const [userNotification, setUserNotification] = useState([]);
  const connect = useMetamask();
  const address = useAddress();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  const yourChannel = "0x4946a945aB5d49fa59E81A00Bb9d6677E0fcB8B4";

  useEffect(() => {
    setSubscribed(storedSubscribed);
  }, [storedSubscribed]);

  useEffect(() => {
    const fetchNotifs = async () => {
      const notifications = await PushAPI.user.getFeeds({
        user: `eip155:42:${address}`, // user address in CAIP-10
        env: ENV.STAGING,
      });
      console.log("Notifications: \n", notifications);
      setUserNotification(notifications);
    };
    fetchNotifs();
  }, [address]);

  const handleSubscribeSuccess = () => {
    setStoredSubscribed(true);
    toast.success("Successfully subscribed!");
  };

  const handleUnsubscribeSuccess = () => {
    setStoredSubscribed(false);
    toast.success("Successfully unsubscribed!");
  };

  const subscribeToNotification = async () => {
    if (signer && address) {
      if (!subscribed) {
        const subscribe = await PushAPI.channels.subscribe({
          signer: signer,
          channelAddress: `eip155:5:${yourChannel}`, // channel address in CAIP
          userAddress: `eip155:5:${address}`, // user address in CAIP
          onSuccess: handleSubscribeSuccess,
          onError: () => {
            toast.error("Unsuccessfully subscribed");
          },
          env: ENV.STAGING,
        });
      } else {
        await PushAPI.channels.unsubscribe({
          signer: signer,
          channelAddress: `eip155:5:${yourChannel}`, // channel address in CAIP
          userAddress: `eip155:5:${address}`, // user address in CAIP
          onSuccess: handleUnsubscribeSuccess,
          onError: () => {
            toast.error("Unsuccessfully unsubscribed");
          },
          env: ENV.STAGING,
        });
      }
    } else {
      connect({
        chainId: Mumbai.chainId,
      });
    }
  };

  const sendNotification = async (
    title: string,
    body: string,
    type?: number
  ) => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer: signer,
        type: 3,
        identityType: 2,
        notification: {
          title: `${title}`,
          body: `${body}`,
        },
        payload: {
          title: `${title}`,
          body: `${body}`,
          cta: "",
          img: "",
        },
        recipients: `eip155:5:${address}`,
        channel: "eip155:5:0x4946a945aB5d49fa59E81A00Bb9d6677E0fcB8B4", // your channel address
        env: ENV.STAGING,
      });
      console.log(apiResponse.data);
    } catch (err) {
      console.error("Error: ", err);
    }
  };
  return (
    <ProtocolContext.Provider
      value={{
        subscribed,
        subscribeToNotification,
        sendNotification,
      }}
    >
      {children}
    </ProtocolContext.Provider>
  );
};

export const useProtocolContext = (): PolyverseContextType => {
  const contextValue = useContext(ProtocolContext);
  if (contextValue === null) {
    throw new Error("useErrandContext must be used within a PolyverseProvider");
  }
  return contextValue;
};
