import React from "react";
import { DNavbar, ProfileDetail, Sidebar, UserTicket } from "../components";
import { Chat } from "@pushprotocol/uiweb";
import { ITheme } from "@pushprotocol/uiweb";
import { page1 } from "../assets";
import { ethers } from 'ethers'
import { usePolyverseContext } from "../context/Auth";

const Profile = () => {
   const {address} = usePolyverseContext()
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  return (
    <div>
      <DNavbar />
      <div className="flex items-start">
        <Sidebar />
        <ProfileDetail />
        <UserTicket />
      </div>
      <Chat
        account={address} //user address
        supportAddress="0xd9c1CCAcD4B8a745e191b62BA3fcaD87229CB26d" //support address
        signer={signer}
        env="staging"
      />
    </div>
  );
};

export default Profile;
