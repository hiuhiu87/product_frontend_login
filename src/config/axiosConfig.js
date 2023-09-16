import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/api/v1", // Replace with your base URL
  headers: {
    "Content-Type": "application/json",
  },
});

const setCommonHeaders = (accessToken) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

export { axiosInstance, setCommonHeaders };
