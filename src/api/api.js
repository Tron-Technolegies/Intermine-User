import axios from "axios";

const api = axios.create({
  baseURL: "https://intermine-backend.onrender.com/api/v1/",
  withCredentials: true,
});

export default api;
