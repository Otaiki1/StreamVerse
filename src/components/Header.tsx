import React from "react";
import { btnimage, headerimg } from "../assets";
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="w-full h-[800px] flex flex-col items-center justify-center mt-[6] mx-auto">
      <div className=" flex items-center justify-center ">
        <img src={headerimg} alt="hero" className="w-full" />
      </div>
      <div className="max-w-7l flex flex-col items-center">
        <h1 className="text-[48px] font-Inter-Bold xl:text-[53px] my-[40px] font-bold ">
          Where Heroes{" "}
          <span className="bg-gradient-to-tr from-[#513EFF] to-[#52E5FF] bg-clip-text text-transparent w-full">
            {" "}
            Create, Connect And{" "}
          </span>
          Share Content <br />
          <p className="text-[#C4C4C4] text-[32px] font-medium text-center">
            Ignite Your Presence in the Web 3 Universe
          </p>
        </h1>
      </div>
      {/** button */}
      <Link to="/signin">
      <button className="border-2 border-[#fff] px-8 py-1.5 flex items-center justify-center space-x-4 rounded-full">
        <p>Get Started</p>
        <img src={btnimage} alt="button" />
      </button></Link>

    </div>
  );
};

export default Header;
