import { ethers } from "ethers";
import React, { useState } from "react";
import Modal from "react-responsive-modal";
import FormField from "./FormField";
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
  const { sendNotification } = useProtocolContext();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
 
  };

  return (
    <Modal open={modalOpen} onClose={onClose} center>
      <h2>Add Funds</h2>
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
