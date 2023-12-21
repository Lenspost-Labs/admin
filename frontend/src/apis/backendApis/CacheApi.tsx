import { apiInstance, config } from "src/apis/backendApis/config/AxiosConfig";

export const apiDeleteSpecificCache = async (data: any) => {
  try {
    const response = await apiInstance.post(
      `/deleteSpecificCache`,
      data,
      config
    );
    console.log("Cache deleted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error deleting cache", error);
  }
};

export const apiDeleteCacheByPattern = async (data: any) => {
  try {
    const response = await apiInstance.post(
      `/deleteCacheByPattern`,
      data,
      config
    );
    console.log("Cache deleted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error deleting cache", error);
  }
};
