import React from "react";
import { page1 } from "../assets";

const UserTicket = () => {
  return (
    <div className="border-l border-[#fff] w-[20%] h-screen px-4">
      <div className="flex flex-col space-y-9">
        <div className="max-w-[354px] bg-gradient-to-b mt-9 from-[#362239] to-[#3F3A3A] border border-[#fff] px-6 py-3.5 rounded-[10px]">
          <div className="flex items-center justify-between space-x-3">
            <div className="flex flex-col items-start">
              <h1 className="text-[16px] font-bold text-[#fff]">
                Dubai Live Concert
              </h1>
              <span className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] bg-clip-text text-transparent text-[12px] font-bold">
                Ticket no: <span className="text-[#fff]">weu8fbff9vv</span>
              </span>
              <span className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] bg-clip-text text-transparent text-[12px] font-bold">
                Time: 4:00
              </span>
              <span className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] bg-clip-text text-transparent text-[12px] font-bold">
                Date: 19/12/1999
              </span>
            </div>
            <img
              src={page1}
              alt="ticket"
              className="rounded-full items-end max-w-[90px] max-h-[90px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTicket;
