import axios from "axios";

const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: "http://44.210.89.155",
  headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
});

export default apiClient;