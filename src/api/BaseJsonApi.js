import { BACKEND_BASE } from "../helpers/constants";
import { errorToast } from "../helpers/toasts";

const BaseJsonApi = async ({ method, uri, data }) => {
  const response = await fetch(BACKEND_BASE + uri, {
    method: method ?? "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data ?? {},
  });
  const json = await response.json();

  if (json.code != 200) errorToast(json.message);

  return json;
};

export default BaseJsonApi;
