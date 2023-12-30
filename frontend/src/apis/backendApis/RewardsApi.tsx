import { apiInstance, config } from "./config/AxiosConfig";

export const apiGetAllPointsHistory = async () => {
    try {
        const response = await apiInstance.get(`/getAllPointsHistory`, config);
        console.log("Rewards:", response);
        return response;
    } catch (error) {
        console.error("Error getting Rewards:", error);
    }
}