import apiClient from "../client";

const getUsers = () => apiClient.get("/api/v1/users");

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

const addUser = ({ name, email, password, photo_path }) =>
  apiClient.post("/api/v1/users", {
    name,
    email,
    password,
    photo_path,
  });


const updateUser = ({ id, name, email, password, photo_path }) =>
  apiClient.put(`/api/v1/users/${id}`, {
    name,
    email,
    password,
    photo_path,
  });

const deleteUser = (id) => apiClient.delete(`/api/v1/users/${id}`);

export default {
  getUsers,
  login,
  logout,
  signup,
  addUser,
  deleteUser,
  updateUser
};
