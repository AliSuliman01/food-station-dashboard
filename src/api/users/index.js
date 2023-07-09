import apiClient from "../client";

const login = ({ email, password }) =>
  apiClient.post("/api/v1/auth/login", {
    email: email,
    password: password,
  });

const logout = () => apiClient.post("/api/v1/auth/logout");

const signup = ({ name, email, password }) =>
  apiClient.post("/api/v1/auth/register", {
    name: name,
    email: email,
    password: password,
  });

export default {
  login,
  logout,
  signup
};
