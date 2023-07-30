import React, { useState } from "react";
import FormField from "../FormField";
import { sendFileToIPFS } from "../../constant/pinata";
import { toast } from "react-toastify";
import { useDataverse } from "../../context/DataverseProvider";

interface SongData {
  name: string;
  audioFile: File | null;
  details: string;
}

const TicketForm = () => {
  const { listEvent } = useDataverse();
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [maxTicket, setMaxTicket] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    const cid = await sendFileToIPFS(file);
    const ipfsPath = "https://ipfs.thirdwebcdn.com/ipfs/" + cid;
    toast.success("Upload successful");
    console.log(ipfsPath);
    setImage(ipfsPath)
    // Handle the file path accordingly
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const tx = await listEvent(name, cost, maxTicket, date, time, location, image, description);
      toast.success("Ticket upload successful");
    } catch (error) {
      toast.error("Transaction failed. Please try again later.");
    }
  };

  return (
    <form
      className="bg-gradient-to-b overflow-y-scroll from-[#362239] to-[#3F3A3A] max-w-7xl mx-9 max-h-screen flex items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="min-w-[300px] min-h-[340px] bg-[#000] border-2 border-blue-600 flex flex-col px-[40px] py-[24.33px] mb-[10%] rounded-[40px] space-y-[16px]">
        <FormField
          title="Title"
          isInput
          isDark
          value={name}
          handleChange={(event) => setName(event.target.value)}
        />
        <FormField
          title="Cost"
          isInput
          isDark
          type="number"
          value={cost}
          handleChange={(event) => setCost(Number(event.target.value))}
        />
        <FormField
          title="Number of Seats"
          type="number"
          isInput
          isDark
          value={maxTicket}
          handleChange={(event) => setMaxTicket(Number(event.target.value))}
        />
        <FormField
          title="Location"
          isInput
          isDark
          value={location}
          handleChange={(event) => setLocation(event.target.value)}
        />
          <FormField
          title="Description"
          isTextArea
          isDark
          value={description}
          handleChange={(event) => setDescription(event.target.value)}
        />
        <FormField
          title="Date"
          isDate
          isDark
          value={date}
          handleChange={(event) => setDate(event.target.value)}
        />
        <FormField
          title="Event Image"
          type="file"
          isFile
          isDark
          handleChange={handleFileChange}
        />

        <button
          className="bg-gradient-to-r from-[#513EFF] to-[#52E5FF] px-6 py-2.5 rounded-[40px]"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
