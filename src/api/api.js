import axios from "axios";

const api = axios.create({
  baseURL: "https://api.intermine-solutions.de/api/v1/",
  withCredentials: true,
});

export default api;
