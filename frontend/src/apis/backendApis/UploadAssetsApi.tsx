import { apiInstance } from "src/apis/backendApis/config/AxiosConfig";

const config = {
  headers : {
    "Content-Type": "multipart/form-data",
  },
};

export const apiUploadToS3 = async (files: FormData) => {
  // console.log(localStorage.getItem("jwt"));
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
  try {
    const response = await apiInstance.post(`/getAssetJSON`, data);
    console.log("Files uploaded successfully:", response);
    return response?.data;
  } catch (error) {
    console.error("Error uploading files:", error);
  }
};

// UploadToDB

export const apiUploadToDB = async (data: any) => {
  try {
    const response = await apiInstance.post(`/uploadToDb`, data);
    console.log("Files uploaded successfully:", response);
    return response?.data;
  } catch (error) {
    console.error("Error uploading files:", error);
  }
};
