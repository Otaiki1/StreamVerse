import React from "react";
import { page1 } from "../../../assets";
import { Link } from "react-router-dom";

const LiveTab = () => {
  const tickets = [
    {
      id: 1,
      title: "Concert Ticket",
      description:
        " Join Game Chatter for captivating conversations that dive into the world of gaming. Engage with industry pros and enthusiasts as we explore the latest releases, gaming trends, and timeless classics. Level up your gaming knowledge with us!.",
    },
    {
      id: 2,
      title: "Movie Ticket",
      description:
        " Join Game Chatter for captivating conversations that dive into the world of gaming. Engage with industry pros and enthusiasts as we explore the latest releases, gaming trends, and timeless classics. Level up your gaming knowledge with us!.",
    },
    {
      id: 3,
      title: "Sports Event Ticket",
      description:
        "Join Game Chatter for captivating conversations that dive into the world of gaming. Engage with industry pros and enthusiasts as we explore the latest releases, gaming trends, and timeless classics. Level up your gaming knowledge with us!.",
    },
  ];
  return (
    <>
      <section className="mt-[20px] bg-gradient-to-b from-[#362239] to-[#3F3A3A] max-w-7xl h-[510px] mx-9">
        <div className="container mx-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-start">Ticket</th>
                <th className="px-4 py-2 text-start">Description</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr
                  className="bg-[#000] mb-6 border-b-8 border-r-4 border-[#3F3A3A]"
                  key={ticket.id}
                >
                  <td className="px-4 py-2">
                    <img
                      src={page1}
                      alt="ticket"
                      className="w-[338px] object-cover h-[97px]"
                    />
                  </td>
                  <td className="px-4 py-2 max-w-[492px] items-start text-[14px] font-medium">
                    <div className="text-start">{ticket.description}</div>
                  </td>
                  <td className="px-4 py-2">
                    <Link to="/ticket">
                      <button className="border-blue-500 border-2 text-xs text-white font-bold py-2 px-4 rounded-[10px]">
                        Buy Ticket
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default LiveTab;
