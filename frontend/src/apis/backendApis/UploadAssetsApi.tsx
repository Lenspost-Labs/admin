import { apiInstance, config } from "src/apis/backendApis/config/AxiosConfig";

export const apiUploadToS3 = async (files: FormData) => {
  console.log(localStorage.getItem("jwt"));
  try {
    console.log(apiInstance);
    const response = await apiInstance.post(`/fileToS3`, files, config);
    console.log("Files uploaded successfully:", response);
    return response?.data;
  } catch (error) {
    console.error("Error uploading files:", error);
  }
};

// getAssetJSON

export const apiGetAssetJSON = async (data: any) => {
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
  }
  try {
    const response = await apiInstance.post(`/getAssetJSON`, data, newConfig);
    console.log("Files uploaded successfully:", response);
    return response?.data;
  } catch (error) {
    console.error("Error uploading files:", error);
  }
};

// UploadToDB

export const apiUploadToDB = async (data: any) => {
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
  }
  try {
    const response = await apiInstance.post(`/uploadToDb`, data, newConfig);
    console.log("Files uploaded successfully:", response);
    return response?.data;
  } catch (error) {
    console.error("Error uploading files:", error);
  }
};