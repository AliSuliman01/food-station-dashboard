import { useEffect } from "react";
import Datatable from "../../../../components/Datatable";
import UserRowCells from "../UserRowCells/UserRowCells";
import UsersGQL from "../../../../gql/users";
import { useMutation, useQuery } from "@apollo/client";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../../../helpers/toasts";
import { useReducer } from "react";
import UserForm from "../UserForm/UserForm";
import { toast } from "react-toastify";
import { usersDataTableReducer } from "./reducer";
import actions from "./actions";
import useApi from "../../../../hooks/useApi";
import FilesApi from "../../../../api/files";
import useQueryWithLoading from "../../../../hooks/useQueryWithLoading";

const tabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const tableHeads = ["User", "Created At", ""];

const UsersDataTable = () => {
  const usersDatatableInitialState = {
    data: [],
  };

  const [state, dispatch] = useReducer(
    usersDataTableReducer,
    usersDatatableInitialState
  );

  const { data: getUsersData, refetch: refetchUsers } = useQueryWithLoading(
    UsersGQL.GET_USERS,
    {
      fetchPolicy: "no-cache",
    }
  );

  const uploadFileApi = useApi(FilesApi.uploadFile);

  const [storeUser] = useMutation(UsersGQL.STORE_USER);
  const [updateUser] = useMutation(UsersGQL.UPDATE_USER);
  const [deleteUser] = useMutation(UsersGQL.DELETE_USER);

  useEffect(() => {
    dispatch({ type: actions.LOAD_DATA, data: getUsersData?.users ?? [] });
  }, [getUsersData]);

  const handleAdd = async (data) => {
    const toastId = `loading-create-user`;
    loadingToast({ message: "Creating User", toastId });

    if (data.photo) {
      const uploadFileResponse = await uploadFileApi.request(
        data.photo,
        "users/photos"
      );
      data.photo_path = uploadFileResponse.data;
    }

    const inputData = {
      name: data.name,
      email: data.email,
      password: data.password,
      photo_path: data.photo_path,
    };

    storeUser({
      variables: {
        input: inputData,
      },
    })
      .then((response) => {
        dispatch({ type: actions.ADD_ITEM, item: response.data.createUser });
        successToast({ message: "User Created Successfully", toastId });
      })
      .catch((error) => {
        console.log(error);
        errorToast({ message: "Failed To Create User", toastId });
      });
  };
  const handleUpdate = async (id, data) => {
    const toastId = `loading-update-user-${id}`;
    loadingToast({ message: "Updating User", toastId });

    if (data.photo) {
      const uploadFileResponse = await uploadFileApi.request(
        data.photo,
        "users/photos"
      );

      data.photo_path = uploadFileResponse.data;
    }

    const input = {
      name: data.name,
      email: data.email,
      photo_path: data.photo_path,
    };

    if (data.password.length > 0) {
      input.password = data.password;
    }

    updateUser({
      variables: {
        id: id,
        input: input,
      },
    })
      .then((response) => {
        dispatch({
          type: actions.UPDATE_ITEM,
          id: id,
          item: response.data.updateUser,
        });
        successToast({ message: "User Updated Successfully", toastId });
      })
      .catch((error) => {
        console.log(error);
        errorToast({ message: "Failed To Update User", toastId });
      });
  };
  const handleDelete = (id) => {
    const toastId = `loading-delete-user-${id}`;
    loadingToast({ message: "Deleting User", toastId });

    deleteUser({
      variables: {
        id,
      },
    })
      .then((res) => {
        dispatch({ type: actions.REMOVE_ITEM, id: id });
        successToast({ message: "User Deleted Successfully", toastId });
        return res;
      })
      .catch((err) => {
        errorToast({ message: "Failed To Delete User", toastId });
        return err;
      });
  };
  const handleSearch = (string) => {
    refetchUsers({
      filter: `%${string}%`,
    });
  };
  return (
    <>
      <Datatable
        heads={tableHeads}
        data={state.data}
        title="Users list"
        description="See information about all users"
        addButtonLabel="Add Memeber"
        handleAdd={handleAdd}
        handleSearch={handleSearch}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        RowCells={UserRowCells}
        FormComponent={UserForm}
      />
    </>
  );
};

export default UsersDataTable;
