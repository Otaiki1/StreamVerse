// import { ethers } from "ethers";
import React, { useState } from "react";
import Modal from "react-responsive-modal";
import FormField from "./FormField";
// import { usePolyverseContext } from "../context/Auth";
// // import { useProtocolContext } from "../context";
// import { useStreamerContext } from "../context/Streamer";
import { ethers } from "ethers";
import Framework from "@superfluid-finance/sdk-core";

interface Props {
  onClose: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: () => void;
  modalOpen: boolean;
}

const SetStream = ({ onClose, openModal, setModalOpen, modalOpen }: Props) => {
  const [inputAddress, setInputAddress] = useState("");
  const [inputAmount, setInputAmount] = useState(0);
  //   const { mint } = usePolyverseContext();
  //   const { sendNotification } = useProtocolContext();
  //   const { createFlow } = useStreamerContext();

  async function createFlow(_receiver: string, _rate: number): Promise<void> {
    // 0.024615460466057584 maticX balance -> 0.005499219 maticX/hour
    const ratePerSeconds = Math.round(
      (_rate / 3600) * 1000000000000000000
    ).toString();

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const chainId = 80001;
      //   const sf = await Framework.create({
      //     chainId: Number(chainId),
      //     provider: provider,
      //   });

      //   const signer = provider.getSigner();

      //   const maticX = await sf.loadSuperToken(
      //     "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4"
      //   );
      //   //const accounts = await window.ethereum.request({ method: "eth_accounts" });
      //   const superSigner = sf.createSigner({ signer: signer });

      //   const createflow = maticX.createFlow({
      //     sender: await superSigner.getAddress(),
      //     receiver: _receiver,
      //     flowRate: ratePerSeconds,
      //   });

      //   const createflowlog = await createflow.exec(signer);

      // setInterval(() => {
      //     if (address.length > 0) {
      //     fetchStreamBalance();
      //     }
      // }, 2500);
    } catch (error) {
      console.log("createflowerror: " + error);
    }
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // await mint(inputAmount);
    // sendNotification(
    //   "Token sent Succesfully",
    //   `${inputAmount.toString()} PVT sent to you`
    // );
    await createFlow(inputAddress, inputAmount);
  };

  return (
    <Modal open={modalOpen} onClose={onClose} center>
      <h2>Add Funds</h2>
      <form onSubmit={handleFormSubmit}>
        <FormField
          title="Amount"
          value={inputAmount}
          handleChange={(e) => setInputAmount(e.target.value)}
          placeHolder={"Enter Stream amount"}
          isInput
        />
        <FormField
          title="Receiver Address"
          value={inputAddress}
          placeHolder="Enter receiver address"
          handleChange={(e) => setInputAddress(e.target.value)}
          isInput
        />
        <button className="border-2 border-blue-700 px-6 py-1.5 rounded-full text-[#000] mt-6 items-center justify flex font-medium text-[16px]">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default SetStream;
