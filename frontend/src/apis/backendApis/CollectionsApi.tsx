import { apiInstance } from "src/apis/backendApis/config/AxiosConfig";

export const apiGetCollections = async ({page}: any) => {
  try {
    const response = await apiInstance.get(`/collections?page=${page}`);
    // console.log("Collections:", response);
    return response;
  } catch (error) {
    console.error("Error getting Collections:", error);
  }
};

export const apiGetSpecificCollection = async (id: number, page: number) => {
  try {
    const response = await apiInstance.get(`/collections/collection?id=${id}&page=${page}`);
    console.log("Collections:", response);
    return response;
  } catch (error) {
    console.error("Error getting Collections:", error);
  }
}