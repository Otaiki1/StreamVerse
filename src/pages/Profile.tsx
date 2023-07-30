import React from "react";
import { DNavbar, ProfileDetail, Sidebar, UserTicket } from "../components";
import { Chat, ENV } from "@pushprotocol/uiweb";
import { ITheme } from "@pushprotocol/uiweb";
import { page1 } from "../assets";
import { ethers } from 'ethers'
import { useAddress } from "@thirdweb-dev/react";
import { useLocation } from "react-router-dom";

const Profile = () => {
   const address = useAddress()
   const { state } = useLocation();
   console.log(state)
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  return (
    <div>
      <DNavbar />
      <div className="flex items-start">
        <Sidebar />
        <ProfileDetail state={state} />
        <UserTicket />
      </div>
      <Chat
        account={`${address}`} //user address
        supportAddress={`${state?.owner}`} //support address
        signer={signer}
        env={ENV.STAGING}

      />
    </div>
  );
};

export default Profile;
