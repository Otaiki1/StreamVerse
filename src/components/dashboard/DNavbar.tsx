import React, { useEffect, useState } from "react";
import { logo, profile } from "../../assets";
import { Link } from "react-router-dom";
import { MdOutlineSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TiTicket } from "react-icons/ti";
import { IconType } from "react-icons/lib";
import Fund from "../Fund";
import { useAddress } from "@thirdweb-dev/react";
import FormField from "../FormField";
import { useSubscription } from "../../context/SubscriptionProvider";
import { ethers } from "ethers";
import Loader from "../Loader";
import { useDataverse } from "../../context/DataverseProvider";
import { WALLET } from "@dataverse/runtime-connector";

interface Link {
  icons: IconType;
  title: string;
  route: string;
}

const DNavbar = () => {
  const { address, runtimeConnector, setAddress } = useDataverse()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModals, setOpenModals] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { createAPlan } = useDataverse();

  const open = () => {
    setOpenModals(true);
  };

  const close = () => {
    setOpenModals(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const price = ethers.utils.parseEther(amount);
      setIsLoading(true);
      await createAPlan(artistName, price);
      closeModal();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const Links: Link[] = [
    {
      icons: MdOutlineSubscriptions,
      title: "Subscription",
      route: "",
    },
    {
      icons: CgProfile,
      title: "Profile",
      route: "",
    },
    {
      icons: TiTicket,
      title: "Ticket",
      route: "",
    },
  ];

  
  const createCapability = async () => {
    const pkh = await runtimeConnector?.createCapability({
      app: "PolyverseTest",
      wallet: WALLET.METAMASK, // optional, if not connected
    });
    console.log(pkh);
    return pkh;
  };

  const connectWallet = async () => {
    try {
      const wallet = await runtimeConnector?.connectWallet(WALLET.METAMASK);
      await runtimeConnector?.switchNetwork(314159);
      createCapability();
      console.log(wallet);
      setAddress(wallet?.address);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="w-full flex items-center h-16 justify-between px-12 py-6.5 border-b border-[#ffffff]">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="border-2 w-[339px] border-[#fff] px-6 py-1.5 rounded-full text-[#fff] font-medium text-[16px]">
        search
      </div>

      <div className="flex items-center space-x-5 cursor-pointer relative">
        <img onClick={openModal} src={profile} alt="profile" />
        {isModalOpen && (
          <div className="w-[322px] bg-[#121212] border border-[#fff] max-h-[525px] mb- absolute top-[60%] right-[90%]">
            <div onClick={closeModal} className="flex items-end justify-end">
              x
            </div>
            <div className="flex items-start px-6 py-3.5 border-b border-[#fff] space-x-12">
              <div className="bg-gradient-to-b from-[#CB52F5] to-[#FE2828] w-[30px] h-[30px] rounded-full" />
              <h2>Account</h2>
            </div>

            <div className="bg-gradient-to-b from-[#362239] to-[#3F3A3A] mx-5 mt-6 ">
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs">Wallet Balance</span>
                <button className="bg-[#D9D9D9] text-white text-xs flex items-center space-x-3 px-2 py-1.5 rounded-full">
                  {address?.slice(0, 6)}...{address?.slice(36, 45)}
                  <div className="bg-green-500 w-4 h-4 rounded-full" />
                </button>
              </div>
              <span className="text-center items-center flex justify-center mb-5 text-[20px] font-semibold">
                230 PVT
              </span>
              <button className="w-full bg-gradient-to-r from-[#513EFF] to-[#52E5FF] text-white text-center items-center px-9 py-4.5  h-[49px]">
                Add funds
              </button>
            </div>

            <div className="flex flex-col px-5 py-2.5 space-y-6 mt-3 items-start">
              {Links.map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <item.icons size={26} />
                  <span>{item.title}</span>
                </div>
              ))}
              <button className="border border-[#FF9090] px-9 py-3.5">
                Logout
              </button>
            </div>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => open()}
            className="border-2 border-[#fff] px-6 py-1.5 rounded-full text-[#fff] font-medium text-[16px]"
          >
            create Plan
          </button>
          <button
          onClick={connectWallet}
          className="border-2 border-[#fff] px-6 py-1.5 rounded-full text-[#fff] font-medium text-[16px]"
        >
          {!address ? "Connect Wallet" : `${address.slice(0, 9)}`}
        </button>
        </div>
      </div>
      {openModals && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          {isLoading && <Loader />}s
          <div onClick={closeModal} />
          <div className="w-[322px] bg-gray-100 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={close} className="text-gray-500">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <FormField
                title="Name"
                isInput
                value={artistName}
                handleChange={(e) => setArtistName(e.target.value)}
              />
              <FormField
                title="Amount"
                isInput
                value={amount}
                handleChange={(e) => setAmount(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent rounded-md shadow-sm"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DNavbar;
