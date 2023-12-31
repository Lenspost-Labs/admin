import { Button, Loader, Textarea } from "@mantine/core";
import { Typography } from "@material-tailwind/react";
import React from "react";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import {
  apiAddTemplates,
  apiGetAllTemplates,
} from "src/apis/backendApis/TemplatesApi";

const TemplatesPage = () => {
  const [templatesArray, setTemplatesArray] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [templateData, setTemplateData] = useState<string>("");

  const fnViewTemplate = async () => {
    setLoading(true);
    const response = await apiGetAllTemplates();
    console.log("Templates:", response);
    setTemplatesArray(response?.data.assets);
    setLoading(false);
  };

  const fnAddTemplate = async (jsonData: Object) => {
    setLoading(true);
    // const stringifiedJson = JSON.stringify(jsonData);
    // console.log("jsonData:", json);

    const response = await apiAddTemplates(jsonData);
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
        <Textarea
          name="ipJsonTemplate"
          onChange={(e) => {
            setTemplateData(e.target.value);
            console.log(templateData);
          }}
          placeholder="Add Template [JSON]"
        />
        <Button className="mt-2" onClick={() => fnAddTemplate(templateData)}>
          Add Template [JSON]
        </Button>

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
              <p>
                {" "}
                <Loader />{" "}
              </p>
            </div>
          )}

          {templatesArray.length === 0 && !loading && <p>No templates</p>}
        </div>
      </div>
    </>
  );
};

export default TemplatesPage;
