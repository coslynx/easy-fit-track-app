import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        const startTime = Date.now();

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        console.log(`Request sent to: ${config.url}`, {
            method: config.method.toUpperCase(),
            headers: config.headers,
            data: config.data,
        });


        config.metadata = { startTime };
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => {
        const endTime = Date.now();
        const duration = endTime - response.config.metadata.startTime;

        console.log(`Response received from: ${response.config.url}`, {
            status: response.status,
            data: response.data,
            duration: `${duration}ms`,
        });

        return response.data;
    },
    (error) => {
        const endTime = Date.now();
        const duration = endTime - error.config.metadata.startTime;
        console.error(`Response error from: ${error.config.url}`, {
            status: error.response ? error.response.status : "Network Error",
            message: error.response ? error.response.data.message : error.message,
            data: error.response ? error.response.data : null,
            duration: `${duration}ms`,
        });

        const errorResponse = {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data.message : "Network Error",
            data: error.response ? error.response.data : null,
        };
        return Promise.reject(errorResponse);

    }
);

export default api;