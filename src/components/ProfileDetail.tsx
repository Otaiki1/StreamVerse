import React, { useEffect, useState } from "react";
import { page1 } from "../assets";
import { useParams } from "react-router-dom";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import Content from "./Content";
import { ethers } from "ethers";
import { useSubscription } from "../context/SubscriptionProvider";
import Loader from "./Loader";
import Subscription from "../context/SubscriptionContract.json";
import { toast } from "react-toastify";
import { sendNotification } from "@pushprotocol/restapi/src/lib/payloads";
import { useDataverse } from "../context/DataverseProvider";

interface UserProfileParams {
  state: any;
}

interface Creator {
  name: string;
  image: string;
  category: string;
  bio: string;
  owner: string;
  cost: string;
}

const ProfileDetail = ({ state }: UserProfileParams) => {
  const { subscribe, userPlans, filterPlansByAddress, setAllPlans } =
    useSubscription();
  const { SubscribeToCreator } = useDataverse();
  const [isLoading, setIsloading] = useState(false);
  const [result, setResult] = useState({});
  console.log(userPlans);

  useEffect(() => {
    filterPlansByAddress(state?.owner);
  }, [state?.owner]);

  const handleSubscription = async (item: any, amount: any) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Get the contract instance
      const contract = new ethers.Contract(
        "0xc166789539A1c5309a9f413E829A629071361214",
        Subscription.abi,
        provider.getSigner()
      );

      // Estimate the gas limit
      const gasLimit = await contract.estimateGas.subscribe(item, {
        value: ethers.utils.parseEther(amount),
      });
      setIsloading(true);
      // Create a transaction object
      const tx = await contract.subscribe(item, {
        value: ethers.utils.parseEther(amount),
        gasLimit: gasLimit,
      });

      // Wait for the transaction to be mined
      await tx.wait();
      setIsloading(false);
      // Perform any additional actions after subscription

      toast.success("Subscription successful!");
    } catch (error) {
      setIsloading(false);
      alert(error);
    }
  };

  return (
    <div className="flex-1 px-6 py-2.5">
      {isLoading && <Loader />}
      <p>Profile</p>
      <div className="flex mt-6 space-x-9 items-center justify-evenly w-full">
        <div className="flex space-x-9 items-center w-full">
          <img
            src={state?.image}
            alt=""
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <div className="flex space-y-3 flex-col items-start">
            <div className="flex space-x-4 items-center">
              <span className="text-[18px] font-bold">{state?.name}</span>
              {userPlans.map((item: any) => (
                <button
                  onClick={() => handleSubscription(item?.pid, item?.amount)}
                  className="bg-[#695AF5] px-4 py-2 text-white rounded-full"
                >
                  Subscribe
                </button>
              ))}
            </div>
            <span className="text-[16px] font-bold">{state?.owner}...</span>
            <span className="flex space-x-2 items-center">
              <FaRegMoneyBillAlt size={25} />
              <p className="text-[#35F415] font-bold text-[14px]">
                ${state?.cost}
              </p>
              <TbEdit size={25} />
            </span>
          </div>
        </div>

        <div className="w-[568px] h-[104px] rounded-[5px]">{state?.bio}</div>
      </div>

      <Content />
    </div>
  );
};

export default ProfileDetail;
