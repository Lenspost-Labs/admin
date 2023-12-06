import { Chip, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TemplatesPage = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [templatesArray, setTemplatesArray] = useState([]); 
  
  const fnViewTemplate = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("jwt")} `,
        },
      };
      const response = await axios.get(`${BACKEND_URL}/templates`, config);

      console.log("Templates:", response);
      setTemplatesArray(response.data.assets);
    } catch (error) {
      console.error("Error getting templates:", error);
    }
  };

  useEffect(() => {
    fnViewTemplate();
  }, []);

  return (
    <>
      <div className="m-8">
        <Typography color="blue-gray" className="mb-4 mt-4">
          Templates
        </Typography>

        <div className="flex flex-wrap">
          {templatesArray.length > 0 ? (
            templatesArray.map((template) => (
              <div key={template.id} className="m-4">
                {/* <p>{template.createdAt}</p> */}
                <img
                  className="h-32 rounded-sm "
                  src={template.image}
                  alt={template.name}
                />
                <div className="pt-1 pb-1 bg-blue-50 p-2 rounded-md rounded-t-none">
                  {template.name}
                </div>
              </div>
            ))
          ) : (
            <p>No templates</p>
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default TemplatesPage;
