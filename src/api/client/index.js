import axios from "axios";

const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: process.env.REACT_APP_BACKEND_REST_API,
  headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
});

export default apiClient;