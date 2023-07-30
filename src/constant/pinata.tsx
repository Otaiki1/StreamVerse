import axios from "axios";
import { pinata_apikey, pinata_secret, sendJsonHeader } from "./config";

export async function sendJSONToIPFS(metadata: any) {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  const data = JSON.stringify({
    pinataMetadata: {
      name: "listdata",
    },
    pinataOptions: {
      cidVersion: 1,
    },
    pinataContent: {
      profileInfo: {
        metadataDetails: metadata,
      },
    },
  });
  const sendJson = await axios.post(url, data, sendJsonHeader);
  const hash = `ipfs://${sendJson.data.IpfsHash}`;
  return hash;
}

export async function sendDataToIPFS(metadata: any) {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  const data = JSON.stringify({
    pinataMetadata: {
      name: "listcontent",
    },
    pinataOptions: {
      cidVersion: 1,
    },
    pinataContent: {
      contentInfo: {
        content: metadata,
      },
    },
  });
  const sendJson = await axios.post(url, data, sendJsonHeader);
  const hash = `ipfs://${sendJson.data.IpfsHash}`;
  return hash;
}

export async function sendFileToIPFS(file: any) {
  const formData = new FormData();
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  formData.append("file", file);
  const opts = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", opts);
  const options = {
    maxBodyLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      pinata_api_key: pinata_apikey,
      pinata_secret_api_key: pinata_secret,
      Accept: "text/plain",
    },
  };
  const resFile = await axios.post(url, formData, options);
  return resFile.data.IpfsHash;
}
