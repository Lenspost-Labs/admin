import { apiInstance, config } from "src/apis/backendApis/config/AxiosConfig";

export const apiGetUsers = async () => {
  try {
    const response = await apiInstance.get(`/users`, config);
    console.log("Users:", response);
    return response;
  } catch (error) {
    console.error("Error getting Users:", error);
  }
};

export const apiEditUserDetails = async (data: any) => {
  try {
    const response = await apiInstance.post(`/editUser`, data, config);
    console.log("User updated successfully:", response);
    return response;
  } catch (error) {
    console.error("Error updating user details", error);
  }
};
