import { apiInstance, config } from "src/apis/backendApis/config/AxiosConfig";

export const apiGetCollections = async () => {
  try {
    const response = await apiInstance.get(`/collections`, config);
    console.log("Collections:", response);
    return response;
  } catch (error) {
    console.error("Error getting Collections:", error);
  }
};
