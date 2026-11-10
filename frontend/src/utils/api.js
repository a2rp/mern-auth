import axios from "axios";

const apiOrigin = (process.env.REACT_APP_API_URL || "http://localhost:1198/api").replace(/\/+$/, "");

const api = axios.create({
    baseURL: apiOrigin,
    timeout: 12000,
    withCredentials: true,
    headers: { Accept: "application/json" },
});

export default api;
