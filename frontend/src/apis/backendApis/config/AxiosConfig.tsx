import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer ".concat(localStorage.getItem("jwt") || ""),
  },
};

export const apiInstance = axios.create({
  baseURL: BACKEND_URL,
  // timeout: 1000,
  headers: config.headers,
});

// import axios, { AxiosRequestHeaders } from "axios";
// import { useContext } from "react";
// import { AppContext } from "src/context/AppContext";

// export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const apiInstance = axios.create({
//   baseURL: BACKEND_URL,
// });

// const config = () => {
//   // const jwt = localStorage.getItem("jwt");
  
//   // Request interceptor to set dynamic headers
//   apiInstance.interceptors.request.use((config) => {
//     config.headers = config.headers as AxiosRequestHeaders;
//     return config;
//   });
  
//   const authToken = useContext(AppContext);
//   const jwt = authToken;

//   return {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${jwt || ""}`,
//     },
//   };
// };

// export { config, apiInstance };