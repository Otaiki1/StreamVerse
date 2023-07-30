import React from "react";
import { page1 } from "../../../assets";
import { Link } from "react-router-dom";

const VideoTab = () => {
  return (
    <div className="mt-[20px] bg-gradient-to-b from-[#362239] to-[#3F3A3A] min-w-7xl min-h-full mx-9 px-5 py-3.5">
      <span className="text-[14px] text-[#C4C4C4] font-bold">Top</span>
      {/** content */}
      <div className="grid grid-cols-4 gap-9 mt-9 items-center justify-center w-full">
        <div className="bg-black max-w-[217px] min-h-[209px] px-3 py-2">
          <Link to="/dashboard/video">
            <img src={page1} alt="" className="min-w-[196px] min-h[138px] " />
          </Link>
          <div className="flex flex-col mt-2 items-start w-full">
            <span className="text-[14px] font-bold text-[#fff]">
              How to design Thumbnails
            </span>
            <div className="flex items-start w-full justify-between">
              <Link to="profile">
                <span className="text-[12px] font-medium">Kaydeen2001</span>
              </Link>
              <span className="text-[12px] font-medium">10:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTab;
