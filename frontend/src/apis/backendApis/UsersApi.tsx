import { apiInstance } from "src/apis/backendApis/config/AxiosConfig";

export const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer ".concat(localStorage.getItem("jwt") || ""),
  },
};

export const apiGetAllUsers = async () => {
  try {
    const response = await apiInstance.get(`/users/showUsers`, config);
    // console.log("Users:", response);
    return response;
  } catch (error) {
    console.error("Error getting Users:", error);
  }
};

export const apiGetSpecificUser = async (id: number) => {
  try {
    const response = await apiInstance.get(`users/user?id=${id}`, config);
    // console.log("Users:", response);
    return response;
  } catch (error) {
    console.error("Error getting Users:", error);
  }
};

export const apiEditUserDetails = async (data: any) => {
  try {
    const response = await apiInstance.post(`/users/editUser`, data, config);
    console.log("User updated successfully:", response);
    return response;
  } catch (error) {
    console.error("Error updating user details", error);
  }
};
