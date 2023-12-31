import { apiInstance, config } from "src/apis/backendApis/config/AxiosConfig";

export const apiGetAllTemplates = async () => {
  try {
    const response = await apiInstance.get(`/templates`, config);
    console.log("Templates:", response);
    return response;
  } catch (error) {
    console.error("Error getting Templates:", error);
  }
};

export const apiAddTemplates = async (data: any) => {
  try{
    const response = await apiInstance.post(`/templates/add`, data, config);
    console.log("Templates uploaded successfully:", response);
    return response;
  }
  catch(error){
    console.error("Error Adding Templates:", error);
  }
}

export const apiUploadTemplateFile = async (data: any) => {
  try{
    const response = await apiInstance.post(`/templates/upload`, data, config);
    console.log("Template Files Uploaded:", response);
    return response;
  }
  catch(error){
    console.error("Error Adding Templates:", error);
  }
}