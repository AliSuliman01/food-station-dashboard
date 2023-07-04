import { useState } from "react";
import { toast } from "react-toastify";

export default (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const request = async (...args) => {
    let result = {};
    let toastId;
    try {
      // toastId = toast.loading("loading");

      const response = await apiFunc(...args);

      if (!response.data.success) throw new Error(response.data.message);

      result = response.data;
      setData(result.data);

      // toast.dismiss(toastId);
    } catch (err) {
      setError(err.message || "Unexpected Error!");
      
      // toast.update(toastId, {
      //   render: err.message,
      //   type: toast.TYPE.ERROR,
      //   isLoading: false,
      //   autoClose: 5000,
      // });

    }
    return result;
  };

  return {
    data,
    error,
    request,
  };
};
