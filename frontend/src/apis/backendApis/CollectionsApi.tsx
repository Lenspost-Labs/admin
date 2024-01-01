import { apiInstance } from "src/apis/backendApis/config/AxiosConfig";

export const apiGetCollections = async ({pgNo, collection}: any) => {
  try {
    const response = await apiInstance.get(`/collections?page=${pgNo}`);
    console.log("Collections:", response);
    return response;
  } catch (error) {
    console.error("Error getting Collections:", error);
  }
};
