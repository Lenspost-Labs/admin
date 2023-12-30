import { Box, CheckIcon, Notification, TextInput } from "@mantine/core";
import { IconFolderOpen } from "@tabler/icons-react";
import React, { useContext, useState } from "react";
import { apiUploadToS3 } from "src/apis/backendApis/UploadAssetsApi";
import { AppContext } from "src/context/AppContext";

const StepUploadToS3 = () => {
  const { arrImagesS3Links, setArrImagesS3Links } = useContext(AppContext);
  const [uploading, setUploading] = useState(false);
  const [folderName, setFolderName] = useState("test");
  const handleFileUpload = async (event: { target: { files: any } }) => {
    
    setUploading(true);
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.error("No files selected");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`files`, files[i]);
    }
    formData.append(`folderName`,folderName );
    const response = await apiUploadToS3(formData);

    const resImageUrls: any[] | ((prevState: never[]) => never[]) = [];

    response?.map((imageUrl: any) => {
      console.log("imageUrl", imageUrl);
      resImageUrls.push(imageUrl);
    });
    setArrImagesS3Links(resImageUrls as string[]);

    setUploading(false);
  };

  return (
    <>
      <Box className="flex align-middle justify-center">
        <div className="flex flex-col ">
          <TextInput
            className="mt-4"
            leftSectionPointerEvents="none"
            leftSection={<IconFolderOpen size={24} />}
            label="Enter Folder name"
            placeholder="test"
            value={folderName}
            onChange={(event) => setFolderName(event.currentTarget.value)}
          />

          <input
            className="mt-4"
            type="file"
            multiple
            onChange={handleFileUpload}
          />

          {uploading && (
            <div className="mt-4 text-yellow-800">Uploading, Please Wait</div>
          )}

          {!uploading && arrImagesS3Links.length > 0 && (
            <div className="mt-4">
              <h3 className=" text-green-400">Uploaded Images Successfully</h3>
              <h3 className=" text-green-400">You can move to next step</h3>
            </div>
          )}
        </div>

        {/* <Notifications autoClose={4000} />; */}
      </Box>
    </>
  );
};

export default StepUploadToS3;
