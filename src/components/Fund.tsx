import { ethers } from "ethers";
import React, { useState } from "react";
import Modal from "react-responsive-modal";
import FormField from "./FormField";
import { usePolyverseContext } from "../context/Auth";
import { useProtocolContext } from "../context";

interface Props {
  onClose: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: () => void;
  modalOpen: boolean;
}

const Fund = ({ onClose, openModal, setModalOpen, modalOpen }: Props) => {
  const [inputAddress, setInputAddress] = useState("");
  const [inputAmount, setInputAmount] = useState(0);
  const { mint } = usePolyverseContext();
  const { sendNotification } = useProtocolContext();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mint(inputAmount);
    sendNotification(
      "Token sent Succesfully",
      `${inputAmount.toString()} PVT sent to you`
    );
  };

  return (
    <Modal open={modalOpen} onClose={onClose} center>
      <h2 className="text-[#000]">Add Funds</h2>
      <p className="text-[#000]">
        Convert your funds into streamVerse streamables cUsd to cUsdX
      </p>
      <form onSubmit={handleFormSubmit}>
        <FormField
          title="Amount"
          value={inputAmount}
          handleChange={(e) => setInputAmount(e.target.value)}
          isInput
        />
        <button className="border-2 border-blue-700 px-6 py-1.5 rounded-full text-[#000] mt-6 items-center justify flex font-medium text-[16px]">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default Fund;
