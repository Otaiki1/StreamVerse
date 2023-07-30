import { Web3Storage } from "web3.storage";

// Replace 'paste-your-token-here' with your actual API token
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA4MEFEZTkwMjFkRjMwNEJBODVmRDk3NDNFN0E0MERiN2I5OGEyODkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY3NjIyMjIwOTgsIm5hbWUiOiJQb2x5dmVyc2UifQ.0eCP03rEMsHXs2pb6YAMEUKAnMfo4Ix79CVdnjgdnPY";

// Create a web3.storage client object
const client = new Web3Storage({ token: accessToken });

async function uploadJsonData(data: any) {
  try {
    const jsonBlob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });

    const files = [
      new File([jsonBlob], "data.json"),
      // Add additional files if needed
    ];

    // Upload the data and files to web3.storage
    const cid = await client.put(files);
    console.log("Uploaded data with CID:", cid);
    return cid;
  } catch (error) {
    console.error("Error uploading data:", error);
  }
}

async function uploadFile(selectedFiles: any) {
  try {
    if (selectedFiles) {
      try {
        const cid = await client.put([selectedFiles]);
        console.log('Uploaded image with CID:', cid);
        return cid
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  } catch (error) {
    console.error("Error uploading files:", error);
    alert("Error uploading files. Please try again.");
  }
}

export { uploadFile, uploadJsonData };
