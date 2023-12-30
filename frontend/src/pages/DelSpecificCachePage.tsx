import React, { useState } from "react";
import { Button, Textarea } from "@material-tailwind/react";
import axios from "axios";

const DelSpecificCachePage = () => {
  const [cache, setCache] = useState("");
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")} `,
        },
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/deleteSpecificCache`,
        {
          data: cache,
        },
        config
      );
      alert("Cache Deleted");
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCache(event.target.value);
  };

  return (
    <div className="m-20">
      <div className="w-full">
        <Textarea
          className="h-96 "
          // type="text"
          label="Delete Cache"
          name="Delete Cache"
          value={cache}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <br />

      <Button fullWidth className="mt-2" type="submit" onClick={handleSubmit} placeholder={undefined}>
        {" "}
        Delete Cache{" "}
      </Button>
    </div>
  );
};

export default DelSpecificCachePage;
