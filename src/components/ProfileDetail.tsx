import React from "react";
import { page1 } from "../assets";
import { usePolyverseContext } from "../context/Auth";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import Content from "./Content";

const ProfileDetail = () => {
  const { address } = usePolyverseContext();
  return (
    <div className="flex-1 px-6 py-2.5">
      <p>Profile</p>
      <div className="flex mt-6 space-x-9 items-center justify-evenly w-full">
        <div className="flex space-x-9 items-center w-full">
          <img
            src={page1}
            alt=""
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <div className="flex space-y-3 flex-col items-start">
            <div className="flex space-x-4 items-center">
              <span className="text-[18px] font-bold">Kaylobv201</span>
              <button className="bg-[#695AF5] px-4 py-2 text-white rounded-full">
                Subscribe
              </button>
            </div>
            <span className="text-[16px] font-bold">
              {address.slice(0, 16)}...
            </span>
            <span className="flex space-x-2 items-center">
              <FaRegMoneyBillAlt size={25} />
              <p className="text-[#35F415] font-bold text-[14px]">$5.00</p>
              <TbEdit size={25} />
            </span>
          </div>
        </div>

        <div className="border border-[#fff] w-[568px] h-[104px] rounded-[5px]"></div>
      </div>

      <Content />
    </div>
  );
};

export default ProfileDetail;
