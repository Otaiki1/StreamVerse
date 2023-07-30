import React, { useState, useEffect } from "react";
import { page1 } from "../../assets";
import { BiPlay } from "react-icons/bi";
import { BsPause, BsShuffle, BsFillVolumeUpFill, BsFillVolumeOffFill } from "react-icons/bs";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  //albumCover: string;
  url: string;
}

interface MusicPlayerProps {
  song: Song;
  isPlaying: boolean;
  onPlayPause: () => void;
  onShuffle: () => void;
  handlePrev: () => void;
  handleNext: () => void;
  //seek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  time: () => void;
  currentTime: number;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isShuffling: boolean;
  refPath: any
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  song,
  isPlaying,
  onPlayPause,
  onShuffle,
  handlePrev,
  handleNext,
  //seek,
  time,
  currentTime,
  duration,
  setDuration,
  setCurrentTime,
  setIsPlaying,
  isShuffling,
  refPath
}) => {
  console.log(song.url)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const [audio] = useState(new Audio(song.url));

  useEffect(() => {
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });
    return () => {
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("timeupdate", () => {});
    };
  }, [audio]);

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseInt(event.target.value);
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
    }
  };
  return (
    <div className="fixed bottom-0 min-w-[1250px]">
      <div className="bg-[#000]  h-[74px] px-6 py-3.5 flex items-center gap-6">
        {/**artist info */}
        <div className="flex items-start space-x-3">
          <img
            src={page1}
            alt={song.artist}
            className="max-w-[35px] max-h-[30px] object-contain"
          />
          <div className="text-start flex flex-col">
            <span>{song.title}</span>
            <span>{song.artist}</span>
          </div>
        </div>
        {/**artist info end  */}

        <div className="flex-1 flex-col items-center">
          <div className="flex items-center space-x-2">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              className="w-full h-2 bg-[#434343] rounded-lg outline-none cursor-pointer"
              onChange={handleSeek}
            />
            <span>{formatTime(duration)}</span>
          </div>
          {/** controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              title="shuffle"
              onClick={onShuffle}
              className={`${isShuffling ? "text-green-800" : "text-white"}`}
            >
              <BsShuffle size={26} />
            </button>
            <button title="prev" onClick={handlePrev}>
              <MdOutlineSkipPrevious size={26} />
            </button>
            <button onClick={onPlayPause}>
              {isPlaying ? <BsPause size={26} /> : <BiPlay size={26} />}
            </button>
            <button title="next" onClick={handleNext}>
              <MdOutlineSkipNext size={26} />
            </button>
          </div>
        </div>
        <audio ref={refPath} src={song.url} />

        <button title="volume" className="items-start">
            <BsFillVolumeOffFill size={26} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
