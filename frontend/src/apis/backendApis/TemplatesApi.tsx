import { apiInstance } from "src/apis/backendApis/config/AxiosConfig";

export const apiGetAllTemplates = async () => {
  try {
    const response = await apiInstance.get(`/templates`);
    console.log("Templates:", response);
    return response;
  } catch (error) {
    console.error("Error getting Templates:", error);
  }
};

export const apiAddTemplates = async (data: any) => {
  try {
    const response = await apiInstance.post(`/templates/add`, data);
    console.log("Templates uploaded successfully:", response);
    return response;
  } catch (error) {
    console.error("Error Adding Templates:", error);
  }
};

export const apiUploadTemplateFile = async (data: any) => {
  try {
    const response = await apiInstance.post(`/templates/upload`, data);
    console.log("Template Files Uploaded:", response);
    return response;
  } catch (error) {
    console.error("Error Adding Templates:", error);
  }
};
