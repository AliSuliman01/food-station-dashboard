import {
  GET_USERS_URI,
  LOGIN_URI,
  LOGOUT_URI,
  SIGNUP_URI,
} from "../helpers/constants";
import BaseJsonApi from "./BaseJsonApi";

export const getUsersApi = async () => {
  return await BaseJsonApi({ uri: GET_USERS_URI });
};

export const loginApi = async ({ email, password }) => {
  const data = {
    email: email,
    password: password,
  };
  return await BaseJsonApi({ uri: LOGIN_URI, method: "POST", data:data });
};

export const logoutApi = async () => {
  return await BaseJsonApi({ uri: LOGOUT_URI, method: "POST" });
};

export const signupApi = async ({ name, email, password }) => {
  const data = {
    name: name,
    email: email,
    password: password,
  };
  return await BaseJsonApi({ uri: SIGNUP_URI, method: "POST", data: { data } });
};
