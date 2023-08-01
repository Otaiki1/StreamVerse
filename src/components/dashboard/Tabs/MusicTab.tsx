import React, { useState, useRef, useEffect } from "react";
import MusicPlayer from "../MusicPlayer";
import { page1, time } from "../../../assets";
import { Link } from "react-router-dom";
import SetStream from "../../SetStream";
import Fund from "../../Fund";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  album: string;
  date: string;
  url: string;
}

interface TableProps {
  songs: Song[];
}

const MusicTab: React.FC<TableProps> = ({ songs }: any) => {
  const [active, setActive] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const activeSongId = localStorage.getItem("activeSongId");
    if (activeSongId) {
      const song = songs.find((song: any) => song.id === Number(activeSongId));
      setActive(song || null);
    }
  }, [songs]);

  const handleSongClick = (song: Song) => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }
    setActive(song);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.play();
      localStorage.setItem("activeSongId", String(song.id));
    }
  };

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  //shuffling the music
  const handleShuffle = () => {
    const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
    setActive(shuffledSongs[0]);
    setIsPlaying(true);
    setIsShuffling(true);
    if (audioRef.current) {
      audioRef.current.src = shuffledSongs[0].url;
      audioRef.current.play();
      localStorage.setItem("activeSongId", String(shuffledSongs[0].id));
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleNextSong = () => {
    // Find the index of the current song in the songs array
    const currentIndex = songs.findIndex((s: any) => s.id === songs.id);
    // Calculate the index of the next song
    const nextIndex = (currentIndex + 1) % songs.length;
    // Get the next song from the songs array
    const nextSong = songs[nextIndex];
    setActive(nextSong);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = nextSong.url;
      audioRef.current.play();
      localStorage.setItem("activeSongId", String(nextSong.id));
    }
  };

  const handlePreviousSong = () => {
    // Find the index of the current song in the songs array
    const currentIndex = songs.findIndex((s: any) => s.id === songs.id);
    // Calculate the index of the previous song
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    // Get the previous song from the songs array
    const previousSong = songs[previousIndex];
    setActive(previousSong);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = previousSong.url;
      audioRef.current.play();
      localStorage.setItem("activeSongId", String(previousSong.id));
    }
  };

  return (
    <>
      <div className="mt-[20px] bg-gradient-to-b from-[#362239] to-[#3F3A3A] max-w-7xl h-[510px] mx-9">
        <table className="table-auto cursor-pointer w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-start">Title</th>
              <th className="px-4 py-2 text-start">
                <img src={time} alt="" />
              </th>
              <th className="px-4 py-2 text-start">Album</th>
              <th className="px-4 py-2 text-start">Date</th>
              <th className="px-4 py-2 text-start"></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song: Song) => (
              <tr
                key={song.id}
                className={`${
                  active && active.id === song.id ? "bg-gray-700" : ""
                }`}
              >
                <td className="px-4 py-2 flex space-x-3 text-start">
                  <img
                    src={page1}
                    alt=""
                    className="rounded-full h-[45px] w-[45px]"
                  />
                  <div className="flex flex-col items-start text-start">
                    <span
                      onClick={() => handleSongClick(song)}
                      className={`${
                        active && active.id === song.id
                          ? "text-[#35F415]"
                          : "text-white"
                      } text-[18px] font-Inter-Bold font-bold`}
                    >
                      {song.title}
                    </span>
                    <Link to="/profile">
                      <span className="text-[#C4C4C4] text-[16px] font-medium leading-[19.32px]">
                        {song.artist}
                      </span>
                    </Link>
                  </div>
                </td>
                <td
                  className={`${
                    active && active.id === song.id
                      ? "text-[#35F415]"
                      : "text-white"
                  } px-4 py-2 text-start`}
                >
                  {song.duration}
                </td>
                <td className="px-4 py-2 text-start">{song.album}</td>
                <td className="px-4 py-2 text-start">{song.date}</td>
                <td
                  className="px-4 py-2 text-start text-[#35F415] text-[16px]"
                  onClick={() => openModal()}
                >
                  Subscribe
                </td>
                {/**modal */}

                <SetStream
                  onClose={closeModal}
                  setModalOpen={setModalOpen}
                  openModal={openModal}
                  modalOpen={modalOpen}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {active && (
        <MusicPlayer
          song={active}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onShuffle={handleShuffle}
          handlePrev={handlePreviousSong}
          handleNext={handleNextSong}
          time={handleTimeUpdate}
          currentTime={currentTime}
          duration={duration}
          setDuration={setDuration}
          setCurrentTime={setCurrentTime}
          setIsPlaying={setIsPlaying}
          isShuffling={isShuffling}
          refPath={audioRef}
        />
      )}
    </>
  );
};

export default MusicTab;
