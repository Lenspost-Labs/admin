import React from "react";
import { Form } from "react-router-dom";
import { FormUploadToDB } from "../components";
import { Typography } from "@material-tailwind/react";

const UploadToDBPage = () => {
  return (
    <>
      <div className="m-8">
        <Typography color="blue-gray" className="mb-4 mt-4">
          Paste the Generated data from the Get Asset JSON Page into the text
          box below
        </Typography>
        <FormUploadToDB />
      </div>
    </>
  );
};

export default UploadToDBPage;
