import { apiInstance } from "src/apis/backendApis/config/AxiosConfig";

export const apiDeleteSpecificCache = async (data: any) => {
  try {
    const response = await apiInstance.post(
      `/deleteSpecificCache`,
      data,
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
    );
    console.log("Cache deleted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error deleting cache", error);
  }
};

export const apiGetPatternCache = async () => {
  try {
    const response = await apiInstance.get(`/cache/fetch`);
    console.log("Caches:", response);
    return response;
  } catch (error) {
    console.error("Error getting Caches:", error);
  }
}