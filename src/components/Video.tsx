import React from "react";
import { Player } from "@livepeer/react";
import { page1 } from "../assets";

const PosterImage = () => {
  return (
    <img src={page1} className="object-cover w-full h-full " alt="video" />
  );
};

const playbackId =
  "bafybeigtqixg4ywcem3p6sitz55wy6xvnr565s6kuwhznpwjices3mmxoe";

const Video = () => {
  return (
    <div className="flex-1 h-screen overflow-y-scroll my-12 scrollbar-hide">
      <div className="mx-8 flex flex-col w-full space-y-10 mt-">
        <div className="h-[600px]">
          <Player
            title="Waterfalls"
            playbackId={playbackId}
            showTitle={false}
            poster={<PosterImage />}
            controls={{
              autohide: 30
            }}
          />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-2xl text-[#fff]">How to design a thumnail</h3>
          <p className="text-[14px] font-bold text-[#D9D9D9]">Kaydeen2001</p>

          <p className="mt-6 text-[#FFFFFF] font-normal leading-[16.94px]">
            <span className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] text-transparent bg-clip-text">
              Description: {" "}
            </span>
            In this concise video, learn the art of designing compelling
            thumbnails that grab attention and entice viewers to click. Discover
            expert tips, techniques, and essential design principles to create
            eye-catching visuals that effectively represent your content and
            increase engagement. From color selection and typography to
            composition and imagery, unlock the secrets to crafting thumbnails
            that make your videos stand out from the crowd. Elevate your
            channel's visual appeal and attract more viewers with this
            must-watch tutorial on thumbnail design.
          </p>
        </div>
        {/** comment */}
        <div className="">
          <p>Comments</p>
          <textarea rows={9} className="min-w-[1317px] bg-[#ffffff] my-9 mb-9 mn-h-[730px] rounded-[10px] overflow-hidden"></textarea>
        </div>
      </div>
    </div>
  );
};

export default Video;
