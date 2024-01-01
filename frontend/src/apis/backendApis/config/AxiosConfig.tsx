import axios from "axios";
// import { useAuth } from "src/context/AppContext";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const { authToken } = useAuth();

// export const config = {
//   headers: {
//     "Content-Type": "multipart/form-data",
//     // Authorization: "Bearer ".concat(localStorage.getItem("jwt") || ""),
//     Authorization: "Bearer ".concat(authToken),
//   },
// };

// export const apiInstance = axios.create({
//   baseURL: BACKEND_URL,
//   // timeout: 1000,
//   headers: config.headers,
// });

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


export const apiInstance = axios.create({
  baseURL: BACKEND_URL,
});

// Add a request interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("jwt");

    // Exclude the login API from adding the default header

    // Add your default header here
    config.headers["Authorization"] = `Bearer ${jwtToken}`;
    config.headers["Content-Type"] = "application/json" || "multipart/form-data";
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Methods"] = "*";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
