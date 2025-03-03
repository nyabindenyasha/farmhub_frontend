import axios from "axios";
import {API_URL} from "@/lib/constants";

// Create an Axios instance
const apiClient = axios.create({
    baseURL: API_URL, // Set your base URL
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000, // Optional: Set a timeout
});

// Add request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // You can add other request-level customizations here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
apiClient.interceptors.response.use(
    (response) => {
        // You can handle global response transformations here
        return response;
    },
    (error) => {
        // Handle global errors (e.g., redirect or log specific errors)
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
