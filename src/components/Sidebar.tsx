import React from "react";
import { home, mail } from "../assets";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiHome } from "react-icons/bi";
import { AiOutlineMail, AiOutlinePlusCircle } from "react-icons/ai";
import { IconType } from "react-icons/lib";

interface Link {
  icons: IconType;
  title: string;
  route: string;
}

const Sidebar = () => {
  const SideBAR: Link[] = [
    {
      title: "Home",
      icons: BiHome,
      route: "/dashboard",
    },
    {
      title: "message",
      icons: AiOutlineMail,
      route: "/",
    },
    {
      title: "notification",
      icons: IoMdNotificationsOutline,
      route: "/",
    },
    {
      title: "create",
      icons: AiOutlinePlusCircle,
      route: "/",
    },
  ];
  return (
    <div className="w-[4%] h-screen border-r border-[#C4C4C4]">
      <div className="flex flex-col items-center mt-[30px] space-y-6">
        {SideBAR.map((item, i) => (
          <Link key={i} to={item.route}>
            <item.icons size={25} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
