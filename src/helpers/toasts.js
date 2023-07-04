import { toast } from "react-toastify";

export const errorToast = ({message = "ERROR", toastId = null}) => {
  if (toastId) {
    toast.update(toastId, {
      render: message,
      type: toast.TYPE.ERROR,
      isLoading: false,
      autoClose: 3000,
    });
  } else
    toast.error(message, {
      position: "top-right",
      type: toast.TYPE.ERROR,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
};

export const successToast = ({message = "SUCCESS", toastId = null}) => {
  if (toastId) {
    console.log(toastId);
    toast.update(toastId, {
      render: message,
      type: toast.TYPE.SUCCESS,
      isLoading: false,
      autoClose: 3000,
    });
  } else
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      type: toast.TYPE.SUCCESS,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
};

export const loadingToast = ({message = "Loading", toastId}) => {
  return toast.loading(message, { toastId});
};
