import React, { useState} from 'react'
import MusicTab from './dashboard/Tabs/MusicTab';
import VideoTab from './dashboard/Tabs/VideoTab';
import LiveTab from './dashboard/Tabs/LiveTab';
import { Tabs } from '../constant';
import Creator from './dashboard/Tabs/Creator';

const Content = () => {
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
          artist: "Drake",
          duration: "3:45",
          album: "The other halves",
          url: "https://cdn.tunezjam.com/audio/Sarz-Good-To-Me-Ft-Perfext-And-Gimba-(TunezJam.com).mp3",
          date: "20-10-1999"
        },
        {
          id: 2,
          title: "Song 2",
          artist: "Artist 2",
          duration: "4:20",
          album: "The other halves",
          url: "https://cdn.tunezjam.com/audio/Burna-Boy-Ft-J-Balvin-Rollercoaster-(TunezJam.com).mp3",
          date: "20-10-1999"
        },
        {
          id: 3,
          title: "Song 3",
          artist: "Artist 3",
          duration: "2:57",
          album: "The other halves",
          url: "https://cdn.tunezjam.com/audio/Rema-Spiderman--[TunezJam.com].mp3",
          date: "20-10-1999"
        },
      ];
  return (
    <div className="flex-1 w-full h-screen">
    <div className="flex items-start border-y border-r border-[#D9D9D9] border-spacing-y-12 py-4 mt-[30px]">
      <div className="flex items-center w-full  space-x-[30px] px-4">
        {Tabs.map((item: any, i: any) => (
          <p
            onClick={() => handleTabClick(item.active)}
            key={i}
            className={`${
              activeTab === item.active
                ? "bg-gradient-to-r from-[#513EFF] to-[#52E5FF] bg-clip-text text-transparent"
                : "text-[#fff]"
            } text-[16px] font-extrabold cursor-pointer flex items-center w-full justify-between`}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
    {activeTab === "music" && <MusicTab songs={songs} />}
    {activeTab === "videos" && <VideoTab />}
    {activeTab === "event" && <LiveTab />}
    {activeTab === "creator" && <Creator />}
  </div>
  )
}

export default Content