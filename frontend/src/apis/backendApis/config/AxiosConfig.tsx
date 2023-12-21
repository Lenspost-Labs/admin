import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  }, 
};

export const apiInstance = axios.create({
  baseURL: BACKEND_URL,
  // timeout: 1000,
  headers: config.headers,
});

