import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAddress, useMetamask, useSigner } from "@thirdweb-dev/react";
import { Modal } from "react-responsive-modal";
import { ethers } from "ethers";

import "react-responsive-modal/styles.css";
import { FaBell } from "react-icons/fa";

// any other web3 ui lib is also acceptable
import { useWeb3React } from "@web3-react/core";

import { logo } from "../assets";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { Mumbai } from "@usedapp/core";
import { useProtocolContext } from "../context";
import FormField from "./FormField";
import Fund from "./Fund";

const Navbar: React.FC = () => {
  const connect = useMetamask();
  const address = useAddress();
  const { subscribeToNotification, subscribed } = useProtocolContext();

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };



  return (
    <nav className="w-full flex items-center h-16 justify-between px-12 py-6.5 border-b border-[#ffffff]">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <ul className="flex items-center cursor-pointer space-x-[170px] font-medium text-[14px]">
        <li>Pictures</li>
        <li>Videos</li>
        <li>Files</li>
      </ul>

      <div className=" flex items-center space-x-4">
        <button
          onClick={subscribeToNotification}
          className={`${subscribed ? "text-blue-700" : "text-white"} text-xl `}
        >
          <FaBell />
        </button>
        <button
          onClick={openModal}
          className="border-2 border-[#fff] px-6 py-1.5 rounded-full text-[#fff] font-medium text-[16px]"
        >
          Add Funds
        </button>
        <button
          onClick={() =>
            connect({
              chainId: Mumbai.chainId,
            })
          }
          className="border-2 border-[#fff] px-6 py-1.5 rounded-full text-[#fff] font-medium text-[16px]"
        >
          {!address
            ? "Connect Wallet"
            : `${address.slice(0, 9)}...${address.slice(36, 45)}`}
        </button>
    {/**modal */}
    <Fund onClose={closeModal} setModalOpen={setModalOpen} openModal={openModal} modalOpen={modalOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
