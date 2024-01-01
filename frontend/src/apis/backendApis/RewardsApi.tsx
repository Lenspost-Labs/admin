import { apiInstance } from "./config/AxiosConfig";

export const apiGetAllPointsHistory = async () => {
    try {
        const response = await apiInstance.get(`/getAllPointsHistory`);
        // console.log("Rewards:", response);
        return response?.data;
    } catch (error) {
        console.error("Error getting Rewards:", error);
    }
}