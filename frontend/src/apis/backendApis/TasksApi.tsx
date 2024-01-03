import { apiInstance } from "src/apis/backendApis/config/AxiosConfig";

export const apiAddTask = async (data: any) => {
  try {
    // const dataIp = {
    //   data,
    // };
    const response = await apiInstance.post(`/tasks/add`, data);
    console.log("Tasks added successfully:", response);
    return response;
  } catch (error) {
    console.error("Error Adding Tasks:", error);
  }
};

export const apiGetAllTasks = async () => {
  try {
    const response = await apiInstance.get(`/tasks`);
    console.log("Tasks:", response);
    return response;
  } catch (error) {
    console.error("Error getting Tasks:", error);
  }
};
