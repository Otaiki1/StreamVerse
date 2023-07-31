import React, { useState } from "react";
import FormField from "./FormField";
import { usePolyverseContext } from "../context/Auth";
import { pen, upload } from "../assets";
import { AiOutlineCamera } from "react-icons/ai";
import { useAddress } from "@thirdweb-dev/react";
import { uploadFile, uploadJsonData } from "../constant/Web3Storage";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { CIDString } from "web3.storage";

const ProfileForm = () => {
  const address = useAddress();
  const { addCreator, createPlan } = usePolyverseContext();
  const [profileImage, setProfileImage] = useState<CIDString | undefined>();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [bio, setBio] = useState("");
  const [price, setPrice] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const router = useNavigate();

  const category = [
    {
      title: "",
      value: "",
    },
    {
      title: "Creator",
      value: "Creator",
    },
    {
      title: "Follower",
      value: "Follower",
    },
  ];

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    const cid = await uploadFile(file);
    toast.success("upload sucessfull");
    console.log(cid);
    setProfileImage(cid);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const amount = ethers.utils.parseEther(price);
    try {
      const obj = {
        name: name,
        bio: bio,
        image: profileImage,
        catefory: categories,
        subFee: amount,
      };
      setIsloading(true);
      const result = await uploadJsonData(obj);
      await addCreator(result, amount);
      toast.success("Creator been added");
      await createPlan(name, amount);
      toast.success("Subscription plan initialized");
      setIsloading(false);
      router("/dashboard");
    } catch (error) {
      toast.error("Transaction failed pls try again later");
    }
  };

  const getProfileImageUrl = () => {
    if (profileImage) {
      const ipfsUrl = `https://ipfs.io/ipfs/${profileImage}`;
      return ipfsUrl;
    }
    return upload;
  };

  return (
    <div className="max-w-[458px] rounded-[10px] items-center justify-center flex flex-col px-6 py-[10px] bg-[#fff]">
      {/* image upload */}
      <form action="" className="w-full">
        <div className="flex flex-col mt-[20px] space-y-4 items-center">
          <div className="relative cursor-pointer">
          <img src={getProfileImageUrl()} alt="upload" />

            <AiOutlineCamera
              size={25}
              className="absolute inset-9 text-white"
            />
          </div>

          <div className="flex cursor-pointer items-center space-x-[30px] ">
            <span className="text-[#3A3A3A] text-[18px] font-bold">
              {address?.slice(0, 9)}...
            </span>
            <img src={pen} alt="pen" />
          </div>
        </div>

        {/* form section */}
        <div className="flex  w-full  flex-wrap mt-[30px] item-center space-y-5">
          <FormField title="Profile Image" handleChange={handleImage} isFile />
          <FormField
            title="Name"
            isInput
            value={name}
            handleChange={(e: any) => setName(e.target.value)}
          />
          <FormField
            title="Category"
            item={category}
            isCategory
            value={categories}
            handleChange={(e: any) => setCategories(e.target.value)}
          />
          <FormField
            title="Subscription Fee"
            type="number"
            isInput
            value={price}
            handleChange={(e: any) => setPrice(e.target.value)}
          />
          <FormField
            title="Bio"
            isTextArea
            value={bio}
            handleChange={(e) => setBio(e.target.value)}
          />
          <div className="flex items-center justify-center w-full">
            <button
              onClick={handleUpload}
              className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] px-8 py-2.5 rounded-full border border-black"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
