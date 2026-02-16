import axios from "axios";

const api = axios.create({
  baseURL: "https://api.intermine-solutions.de/api/v1/",
  withCredentials: true,
});

export default api;
//https://api.intermine-solutions.de/api/v1/
// http://localhost:3000/api/v1/
