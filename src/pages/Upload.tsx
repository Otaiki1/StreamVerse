import React, { useState } from "react";
import { DNavbar, Sidebar, SongsForm, UserTicket } from "../components";
import TicketForm from "../components/form/TicketForm";
import VideoForm from "../components/form/VideoForm";

const Upload = () => {
  const [active, setActive] = useState("song");
  const Tabs = [
    {
      name: "Songs",
      active: "song",
    },
    {
      name: "Videos",
      active: "video",
    },
    {
      name: "Ticket",
      active: "ticket",
    },
  ];
  return (
    <>
      <DNavbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="flex-1 items-start">
          <h1 className="px-5 py-2.5">Post</h1>
          <div className="border-y-2 border py-4 flex items-center justify-between px-4 w-full">
            {Tabs.map((item) => (
              <div onClick={() => setActive(item.active)} key={item.name}>
                <span
                  className={`${
                    active === item.active
                      ? "bg-gradient-to-r from-[#513EFF] to-[#52E5FF] bg-clip-text text-transparent"
                      : "text-[#fff]"
                  } text-[16px] font-extrabold cursor-pointer flex items-center w-full justify-between`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          {active === "song" && <SongsForm />}
          {active === "video" && <VideoForm />}
          {active === "ticket" && <TicketForm />}
        </div>
        <UserTicket />
      </div>
    </>
  );
};

export default Upload;
