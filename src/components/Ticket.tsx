import React, { useState } from "react";
import Modal from "react-modal";
import { page1 } from "../assets";
import Virtual from "./Virtual";
import Live from "./Live";

const Ticket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState("virtual")

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalStyles = {
    content: {
      width: "673px",
      top: '10%',
      left: '30%',
      color: "black"
    },
  };
  return (
    <div className="flex-1 h-screen mx-9">
      <div className="mt-9 flex flex-col  space-y-8">
        <img src={page1} alt="" className="w-full object-cover h-[202px]" />
        <h1 className="text-[24px] font-bold font-Inter-Bold leading-[29.05px]">
          Zeus GameDay live stream -{" "}
          <span className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] bg-clip-text text-transparent">
            @Realanthonymilees
          </span>
        </h1>
        <p className="text-[16px] font-medium font-Inter-VariableFont">
          {" "}
          Join Game Chatter for captivating conversations that dive into the
          world of gaming. Engage with industry pros and enthusiasts as we
          explore the latest releases, gaming trends, and timeless classics.
          Level up your gaming knowledge with us!
        </p>
      </div>
      <div className="mt-9">
        <h2 className="text-[20px] leading-[24.2px] font-Inter-Bold font-bold">
          Details
        </h2>
        <div className="flex-col flex items-start text-[16px] leading-[19.36px] space-y-4 text-[#FFFFFF]">
          <span className="">Event Title: Game Day Streaming Spectacular</span>
          <span>Date & Time: December 23, 2023, at 4:00 PM</span>
          <span>Ticket Price: $0.6 USD (Limited availability!)</span>
        </div>
      </div>
      <button
        className="w-full border-2 border-blue-500 px-9 py-2.5 text-center mt-9 rounded-[10px]"
        onClick={openModal}
      >
        Buy Ticket
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        overlayClassName="overlay"
      >
        <div className="flex items-center justify-center space-x-6">
          <button onClick={() => setActive("virtual")} className={`${active === "virtual" ? "bg-gradient-to-r from-[#513EFF] to-[#52E5FF]" : "border-blue-500 border-2"} text-black px-9 py-2.5 text-center mt-9 rounded-full`}>
            Virtual Event
          </button>
          <button onClick={() => setActive("live")} className={`${active === "live" ? "bg-gradient-to-r from-[#513EFF] to-[#52E5FF]" : "border-blue-500 border-2"} text-black  px-9 py-2.5 text-center mt-9 rounded-full`}>
            Live Event
          </button>
        </div>
        {/* Add your modal content here */}
        {active === "virtual" && <Virtual />}
        {active === "live" && <Live />}
      </Modal>
    </div>
  );
};

export default Ticket;
