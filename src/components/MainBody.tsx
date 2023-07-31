import React, { useState } from "react";
import { Section, Tabs } from "../constant";
import MusicTab from "./dashboard/Tabs/MusicTab";
import VideoTab from "./dashboard/Tabs/VideoTab";
import { page1 } from "../assets";
import LiveTab from "./dashboard/Tabs/LiveTab";
import Content from "./Content";

const MainBody = () => {
  const [active, setActive] = useState("music");
  const [activeTab, setActiveTab] = useState("music");

  const handleItemClick = (itemActive: string) => {
    setActive(itemActive);
  };

  const handleTabClick = (itemActive: string) => {
    setActiveTab(itemActive);
  };

  type songProps = {
    id: number;
    title: string;
    artist: string;
    duration: string;
    album: string;
    url: string;
    date: string; // Add the 'date' property
  };

  const songs: songProps[] = [
    {
      id: 1,
      title: "I can’t work it out",
      artist: "Kaysong",
      duration: "3:45",
      album: "The other halves",
      url: "https://cdn.tunezjam.com/audio/Sarz-Good-To-Me-Ft-Perfext-And-Gimba-(TunezJam.com).mp3",
      date: "20-10-1999",
    },
    {
      id: 2,
      title: "Song 2",
      artist: "Artist 2",
      duration: "4:20",
      album: "The other halves",
      url: "https://cdn.tunezjam.com/audio/Burna-Boy-Ft-J-Balvin-Rollercoaster-(TunezJam.com).mp3",
      date: "20-10-1999",
    },
    {
      id: 3,
      title: "Song 3",
      artist: "Artist 3",
      duration: "2:57",
      album: "The other halves",
      url: "https://cdn.tunezjam.com/audio/Rema-Spiderman--[TunezJam.com].mp3",
      date: "20-10-1999",
    },
  ];
  return (
    <div className="flex-1 w-full h-screen">
      {/**categories */}
      <div className="flex items-center ml-4 space-x-12">
        {Section.map((item, i) => (
          <div
            onClick={() => handleItemClick(item.active)}
            key={i}
            className={`${
              active === item.active
                ? "border-[#D9D9D9] border-4"
                : "border-none"
            } ${
              item.style
            } max-w-[260px] mt-[20px] cursor-pointer flex items-center justify-center space-x-3 py-4 px-8 max-h-[130px] rounded-[10px]`}
          >
            <img src={item.image} alt="" />
            <p className="font-medium w-full text-[16px] text-[#121212] text-sm">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center w-full">
        {/** music components */}
        <Content />
        <div className="w-1/4 h-screen mt-[53px] items-start border-l border-[#D9D9D9]">
          <h1 className="border-y border-[#D9D9D9] py-4 px-2.5">Your Ticket</h1>
          <div className="flex flex-col items-center space-y-7">
            {/**tickets */}
            <div className="!min-w-[354px] bg-gradient-to-b mt-9 from-[#362239] to-[#3F3A3A] border border-[#fff] px-6 py-3.5 rounded-[10px]">
              <div className="flex items-center justify-between space-x-3">
                <div className="flex flex-col items-start">
                  <h1 className="text-[16px] font-bold text-[#fff]">
                    Dubai Live Concert
                  </h1>
                  <span className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] bg-clip-text text-transparent text-[12px] font-bold">
                    Ticket no: <span className="text-[#fff]">weu8fbff9vv</span>
                  </span>
                  <span className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] bg-clip-text text-transparent text-[12px] font-bold">
                    Time: 4:0
                  </span>
                  <span className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] bg-clip-text text-transparent text-[12px] font-bold">
                    Date: 19/12/1999
                  </span>
                </div>
                <img
                  src={page1}
                  alt="ticket"
                  className="rounded-full items-end !max-w-[90px] !max-h-[90px]"
                />
              </div>
            </div>
            {/** ticket end */}
          </div>
          C
        </div>
      </div>
    </div>
  );
};

export default MainBody;
