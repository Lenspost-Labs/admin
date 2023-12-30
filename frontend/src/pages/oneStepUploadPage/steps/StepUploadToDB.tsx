import { Button, Textarea } from "@mantine/core";
import React, { useContext, useState } from "react";
import { apiUploadToDB } from "src/apis/backendApis/UploadAssetsApi";
import { AppContext } from "src/context/AppContext";

const StepUploadToDB = () => {
  const { arrImagesMetadata } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [dataUploadToDB, setDataUploadToDB] =
    useState<any[]>(arrImagesMetadata);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    console.log("dataUploadToDB:", dataUploadToDB);
    let check = JSON.parse(`[${arrImagesMetadata}]`);
    console.log(check);
    const resUploadToDB = await apiUploadToDB({ data: check });
    setUploadStatus(true);
    console.log("Response:", resUploadToDB);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // setDataUploadToDB(event.target.value.split("\n"));
    setLoading(true);

    setDataUploadToDB(arrImagesMetadata);
    console.log(event.target.value);

  
    setLoading(false);
  };

  return (
    <>
      {/* {arrImagesMetadata && arrImagesMetadata} */}

      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <Textarea
            // className="h-96 "
            // type="text"
            label="Asset JSON"
            name="assetJSON"
            value={dataUploadToDB}
            disabled
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <br />

        <Button loading={loading} fullWidth className="mt-2" type="submit">
          {" "}
          Upload to DB{" "}
        </Button>
      </form>

      {uploadStatus && (
        <div className="mt-4 text-green-500"> Data Uploaded Successfully</div>
      )}
    </>
  );
};

export default StepUploadToDB;
