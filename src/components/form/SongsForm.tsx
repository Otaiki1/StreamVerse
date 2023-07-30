import React, { useState } from "react";
import FormField from "../FormField";
import { useDataverse } from "../../context/DataverseProvider";
import { toast } from "react-toastify";
import { sendFileToIPFS } from "../../constant/pinata";
import Loader from "../Loader";

interface SongData {
  name: string;
  audioFile: File | null;
  details: string;
}

const SongsForm = () => {
  const { uploadMusic } = useDataverse();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [musicFile, setMusicFile] = useState("");
  const [category, setCategory] = useState("");
  const [feature, setFeature] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    const cid = await sendFileToIPFS(file);
    const ipfsPath = "https://ipfs.thirdwebcdn.com/ipfs/" + cid;
    toast.success("upload sucessfull");
    console.log(ipfsPath);
    setImage(ipfsPath);
  };

  const handleMusicFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    const cid = await sendFileToIPFS(file);
    const ipfsPath = "https://ipfs.thirdwebcdn.com/ipfs/" + cid;
    toast.success("upload sucessfull");
    console.log(ipfsPath);
    setMusicFile(ipfsPath);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsloading(true);
      const tx = await uploadMusic(
        title, musicFile, image, category, feature
      );
      toast.success("Music upload Successfull");
      setIsloading(false);
    } catch (error) {
      toast.error("Transaction failed pls try again later");
      setIsloading(false);
    }
  };

  const categories = [
    {
      value: "Gospel",
      title: "Gospel",
    },
    {
      value: "Afrobeat",
      title: "Afrobeat",
    },
    {
      value: "Hip Hop",
      title: "Hip Hop",
    },
  ];

  return (
    <form className="bg-gradient-to-b from-[#362239]  to-[#3F3A3A] max-w-7xl h-screen mx-9 w-full flex items-center justify-center">
      {isLoading && <Loader />}
      <div className="min-w-[300px] min-h-[340px] bg-[#000] border-2 mb-[10%] border-blue-600 flex flex-col items-center justify-center px-[40px] py-[24.33px] rounded-[40px] space-y-[16px]">
        <FormField
          title="Title"
          isInput
          isDark
          value={title}
          handleChange={(e) => setTitle(e.target.value)}
        />
        <FormField
          title="Features"
          isInput
          isDark
          value={feature}
          handleChange={(e) => setFeature(e.target.value)}
        />
        <FormField
          title="Category"
          isDark
          isCategory
          item={categories}
          value={category}
          handleChange={(e) => setCategory(e.target.value)}
        />
        <FormField
          title="Music File"
          isFile
          isDark
          handleChange={handleMusicFileChange}
        />
        <FormField
          title="Music Image"
          isFile
          isDark
          handleChange={handleFileChange}
        />

        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] px-6 py-2.5 rounded-[40px]"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SongsForm;
