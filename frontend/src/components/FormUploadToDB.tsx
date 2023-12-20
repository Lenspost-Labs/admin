import { Alert, Button, Input, Textarea } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";

const FormUploadToDB = () => {
  // {"image":"https://lenspost.s3.ap-south-1.amazonaws.com/test/CloudRock.jpeg","tags":["sdf","Trsdee","fasa sfafdsafdas","safdsdf","fasdsdf"],"author":"rockuthor","type":"props","featured":false,"dimensions":[2048,1356],"wallet":"0xxdfsdfsdsyz","campaign":"test"}

  const BE_URL = import.meta.env.VITE_BACKEND_URL;
  const [openAlert, setOpenAlert] = useState(false);

  const [dataUploadToDB, setDataUploadToDB] = useState<String[]>([]);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")} `,
        },
      };
      let check = JSON.parse(`[${dataUploadToDB}]`);
      console.log(check);

      const response = await axios.post(
        `${BE_URL}/uploadToDb`,
        { data: check },
        config
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error uploading sticker data:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataUploadToDB(event.target.value.split('\n'));
    console.log(event.target.value);
  };

  return (
    <>
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

      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <Textarea
            className="h-96 "
            // type="text"
            label="Asset JSON"
            name="assetJSON"
            // value={dataUploadToDB}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <br />

        <Button fullWidth className="mt-2" type="submit"  placeholder={undefined}>
          {" "}
          Upload to DB{" "}
        </Button>
      </form>
    </>
  );
};

export default FormUploadToDB;
