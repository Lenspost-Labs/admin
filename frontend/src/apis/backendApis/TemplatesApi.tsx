import { apiInstance, config } from "src/apis/backendApis/config/AxiosConfig";

export const apiGetTemplates = async () => {
  try {
    const response = await apiInstance.get(`/templates`, config);
    console.log("Templates:", response);
    return response;
  } catch (error) {
    console.error("Error getting Templates:", error);
  }
};
