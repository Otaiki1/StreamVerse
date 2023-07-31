import React, { useEffect, useState } from "react";
import { logo, profile } from "../../assets";
import { Link } from "react-router-dom";
import { MdOutlineSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TiTicket } from "react-icons/ti";
import { IconType } from "react-icons/lib";
import { ethers } from "ethers";
import { usePolyverseContext } from "../../context/Auth";
import Fund from "../Fund";
import { useAddress } from "@thirdweb-dev/react";

interface Link {
  icons: IconType;
  title: string;
  route: string;
}

const DNavbar = () => {
  const { userBalance } = usePolyverseContext();
  const address = useAddress()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModals, setOpenModals] = useState(false);

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
                {Number(userBalance)} PVT
              </span>
              <button
                onClick={() => setOpenModals(true)}
                className="w-full bg-gradient-to-r from-[#513EFF] to-[#52E5FF] text-white text-center items-center px-9 py-4.5  h-[49px]"
              >
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
        <button className="border-2 border-[#fff] px-6 py-1.5 rounded-full text-[#fff] font-medium text-[16px]">
          {address?.slice(0, 9)}...
        </button>

        {openModals && (
          <Fund
            modalOpen={openModals}
            onClose={close}
            openModal={open}
            setModalOpen={setOpenModals}
          />
        )}
      </div>
    </nav>
  );
};

export default DNavbar;
