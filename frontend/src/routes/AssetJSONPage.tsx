import React from "react";
import { FormGetAsset } from "../components";
import { Typography } from "@material-tailwind/react";

const AssetJSONPage = () => {
  return (
    <>
      <div className="m-8"> 
      <Typography color="blue-gray" className="mb-8 mt-4" placeholder={undefined}>
         Set metadata for your recently uploaded assets
        </Typography>

        <FormGetAsset />
      </div>
    </>
  );
};

export default AssetJSONPage;
