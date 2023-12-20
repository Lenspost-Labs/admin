import { useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import React from "react";

// const BE_URL = import.meta.env.VITE_BACKEND_URL;
const BE_URL = import.meta.env.VITE_BACKEND_URL;
const FormGetAsset = () => {
  const [resAssetJSON, setResAssetJSON] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  const [stickerData, setStickerData] = useState({
    stickerName: "rockName",
    stickerAuthor: "rockuthor",
    type: "props",
    data: ["https://lenspost.s3.ap-south-1.amazonaws.com/test/CloudRock.jpeg"],
    tags: ["sdf", "Trsdee", "fasa sfafdsafdas", "safdsdf", "fasdsdf"],
    wallet: "0xxdfsdfsdsyz",
    campaign: "test",
    featured: false,
  });

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    console.log(stickerData);

    if (name === "tags") {
      const tagsArray = value.split(",").map((tag: string) => tag.trim());
      setStickerData({
        ...stickerData,
        [name]: tagsArray,
      });
    } else {
      setStickerData({
        ...stickerData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")} `,
        },
      };
      let jsondata = stickerData;
      jsondata.data = jsondata.data.join(",").split(",");
      console.log(jsondata);

      const response = await axios.post(
        `${BE_URL}/getAssetJSON`,
        jsondata,
        config
      );
      console.log("Response:", response.data);
      setResAssetJSON(response.data);
    } catch (error) {
      console.error("Error uploading sticker data:", error);
    }
  };

  const handleCopyToClipboard = () => {
    if (!resAssetJSON) return;

    navigator.clipboard.writeText(resAssetJSON);

    setOpenAlert(true);
  };

  return (
    <div className="flex flex-col w-96">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Asset Name"
          name="stickerName"
          value={stickerData.stickerName}
          onChange={handleInputChange} crossOrigin={undefined}        />

        <br />

        <Input
          type="text"
          label="Asset Author"
          name="stickerAuthor"
          value={stickerData.stickerAuthor}
          onChange={handleInputChange} crossOrigin={undefined}        />

        <br />

        <Input
          type="text"
          label="Type"
          name="type"
          value={stickerData.type}
          onChange={handleInputChange} crossOrigin={undefined}        />

        <br />
        <Input
          type="text"
          label="Wallet"
          name="wallet"
          value={stickerData.wallet}
          onChange={handleInputChange} crossOrigin={undefined}        />

        <br />
        <Input
          type="text"
          label="Campaign"
          name="campaign"
          value={stickerData.campaign}
          onChange={handleInputChange} crossOrigin={undefined}        />

        <br />
        <Textarea
          // Remove the 'type' attribute
          // type="text"
          label="tags"
          name="tags"
          value={stickerData.tags}
          onChange={handleInputChange}
        />

        <br />

        <Textarea
            // type="textarea"
          label="data"
          name="data"
          value={stickerData.data}
          onChange={handleInputChange}
        />

        <br />

        {/* <Switch
          label="Featured"
          name="featured"
          value={setStickerData.featured}
        /> */}

        <Input
          disabled
          type="text"
          label="Featured [True/False]"
          name="featured"
          value={stickerData.featured.toString()}
          onChange={handleInputChange} crossOrigin={undefined}        />

        <br />

        <Button fullWidth className="mt-8" type="submit" placeholder={undefined}>
          {" "}
          Get Asset JSON{" "}
        </Button>
      </form>

      <Alert
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        Copied to Clipboard!
      </Alert>

      {resAssetJSON && (
        <Card className="mt-6 w-96" placeholder={undefined}>
          <CardBody placeholder={undefined}>
            <Typography variant="h6" color="blue-gray" className="mb-2" placeholder={undefined}>
              Copy and paste in <Link to="/uploadToDB">Upload to DB Page</Link>
            </Typography>
            <Typography placeholder={undefined}>{resAssetJSON}</Typography>
          </CardBody>
          <CardFooter className="pt-0" placeholder={undefined}>
            <Button color="blue" fullWidth onClick={handleCopyToClipboard} placeholder={undefined}>
              Click to Copy{" "}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default FormGetAsset;
