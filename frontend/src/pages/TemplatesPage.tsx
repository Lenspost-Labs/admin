import { Loader } from "@mantine/core";
import { Typography } from "@material-tailwind/react";
import React from "react";
import { useEffect, useState } from "react";
import { apiGetAllTemplates } from "src/apis/backendApis/TemplatesApi";

const TemplatesPage = () => {
  const [templatesArray, setTemplatesArray] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fnViewTemplate = async () => {
    setLoading(true);
    const response = await apiGetAllTemplates();
    console.log("Templates:", response);
    setTemplatesArray(response?.data.assets);
    setLoading(false);
  };

  useEffect(() => {
    fnViewTemplate();
  }, []);

  return (
    <>
      <div className="">
        <Typography
          placeholder={undefined}
          color="blue-gray"
          className="mb-4 mt-4"
        >
          Templates
        </Typography>

        <div className="flex flex-wrap">
          {templatesArray.length > 0 &&
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
            ))}

          {loading && (
            <div className="m-4 text-yellow-800 align-middle">
              <p> <Loader /> </p>
             
            </div>
          )}

          {templatesArray.length === 0 && !loading && <p>No templates</p>}
        </div>
      </div>
    </>
  );
};

export default TemplatesPage;
