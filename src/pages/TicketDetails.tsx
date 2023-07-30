import React from "react";
import { DNavbar, Sidebar, Ticket, UserTicket } from "../components";
import { page1 } from "../assets";

const TicketDetails = () => {
  return (
    <>
      <DNavbar />
      <div className="flex items-start">
        <Sidebar />
        <Ticket />
        <UserTicket />
      </div>
    </>
  );
};

export default TicketDetails;
