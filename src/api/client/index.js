import axios from "axios";

const dashboardSettings = JSON.parse(localStorage.getItem('dashboard-settings'));

const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: dashboardSettings.backend_base_url,
  headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
});

export default apiClient;