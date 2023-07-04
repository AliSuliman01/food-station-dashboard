import { useQuery } from "@apollo/client";
import { errorToast, loadingToast } from "../../helpers/toasts";
import { toast } from "react-toastify";

const useQueryWithLoading = (...arg) => {
  const res = useQuery(...arg);

  const { loading, error, data } = res;

  if (loading)
    loadingToast({ message: "Loading data...", toastId: "loading" });

  if (error)
    errorToast({ message: "Error fetching data", toastId: "loading" });

  if (data) toast.dismiss("loading");

  return res;
};

export default useQueryWithLoading;
