import React, { useState } from "react";
import { Button, Textarea } from "@material-tailwind/react";
import axios from "axios";

const DelSpecificCachePage = () => {
  const [cache, setCache] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")} `,
        },
      };
      const response = await axios.post(
        "http://localhost:3000/deleteCache",
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
  const handleInputChange = (event) => {
    setCache(event.target.value);
  };

  return (
    <>
      <div className="w-full mt-20">
        <Textarea
          className="h-96 "
          type="text"
          label="Delete Cache"
          name="Delete Cache"
          value={cache}
          onChange={(e) => handleInputChange(e)}
        />
      </div>

      <br />

      <Button fullWidth className="mt-2" type="submit" onClick={handleSubmit}>
        {" "}
        Delete Cache{" "}
      </Button>
    </>
  );
};

export default DelSpecificCachePage;
