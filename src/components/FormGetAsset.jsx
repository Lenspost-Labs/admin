import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";

const FormGetAsset = () => {
  return (
    <>
      <form action="" method="post">
        <div className="mt-2">
          <Input label="Asset Name" name="stickerName" />
        </div>
        <div className="mt-2">
          <Input label="Asset Author" name="stickerAuthor" />
        </div>
        <div className="mt-2">
          <Input label="Type" name="type" />
        </div>
        <div className="mt-2">
          <Textarea label="Tags" name="tags" />
        </div>
        <div className="mt-2">
          <Input label="Wallet" name="wallet" />
        </div>
        <div className="mt-2">
          <Input label="Campaign" name="campaign" />
        </div>
        <div className="mt-2">
          <Input label="Featured" name="featured" />
        </div>
        <div className="mt-4 w-full">
          <Button fullWidth color="blue" type="submit">
            Upload to DB
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormGetAsset;
