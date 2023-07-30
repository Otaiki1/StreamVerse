import React from "react";
import { DNavbar, Sidebar, Video } from "../components";
import { page1 } from "../assets";
import { Link } from "react-router-dom";

const VideoPlayer = () => {
  return (
    <div>
      <DNavbar />
      <div className="flex items-start gap-5">
        <Sidebar />
        <Video />
        <div className="w-[25%] border-l border-[#fff] h-screen flex flex-col items-start px-4 py-6 overflow-y-scroll scrollbar-hide">
          <span className="text-[14px] font-bold text-[#fff]">More Videos</span>
          <div className="flex flex-col mt-6 w-full items-cente">
            <div className="bg-black min-w-[217px] flex space-x-6 min-h-[109px] px-3 py-2">
              <Link to="/dashboard/video">
                <img
                  src={page1}
                  alt=""
                  className="min-w-[96px] min-h[58px] "
                />
              </Link>
              <div className="flex flex-col mt-2 space-y-3 items-start w-full">
                <span className="text-xl font-bold text-[#fff]">
                  How to design Thumbnails
                </span>
                <span className="text-[12px] font-medium">Kaydeen2001</span>
                <div className="flex items-start w-full justify-between">
                <span className="text-[12px] font-medium">Kaydeen2001</span>
                  <span className="text-[12px] font-medium">2 years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
