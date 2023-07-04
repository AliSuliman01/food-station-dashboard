import { useEffect } from "react";
import Datatable from "../../../../components/Datatable";
import RestaurantRowCells from "../RestaurantRowCells";
import RestaurantsGQL from "../../../../gql/restaurants";
import { useMutation, useQuery } from "@apollo/client";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../../../helpers/toasts";
import { useReducer } from "react";
import RestaurantForm from "../RestaurantForm";
import { toast } from "react-toastify";
import { restaurantsDataTableReducer } from "./reducer";
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

const tableHeads = ["Restaurant", "Location (Lat / Long)","Owner", "Created At", ""];

const RestaurantsDataTable = () => {
  const restaurantsDatatableInitialState = {
    data: [],
  };

  const [state, dispatch] = useReducer(
    restaurantsDataTableReducer,
    restaurantsDatatableInitialState
  );

  const { data: restaurantsData, refetch: refetchRestaurants } = useQueryWithLoading(
    RestaurantsGQL.GET_RESTAURANTS,
    {
      fetchPolicy: "no-cache",
    }
  );

  const uploadFileApi = useApi(FilesApi.uploadFile);

  const [storeRestaurant] = useMutation(RestaurantsGQL.STORE_RESTAURANT);
  const [updateRestaurant] = useMutation(RestaurantsGQL.UPDATE_RESTAURANT);
  const [deleteRestaurant] = useMutation(RestaurantsGQL.DELETE_RESTAURANT);

  useEffect(() => {
    if(restaurantsData?.restaurants)
      dispatch({ type: actions.LOAD_DATA, data: restaurantsData?.restaurants });
  }, [restaurantsData]);

  const handleAdd = async (data) => {
    console.log('handle add' , data);
    const toastId = `loading-create-restaurant`;
    loadingToast({ message: "Creating Restaurant", toastId });

 
    if (data.photo) {
      const uploadFileResponse = await uploadFileApi.request(
        data.photo,
        "restaurants/photos"
      );
      data.cover_image_path = uploadFileResponse.data;
    }

    const inputData = {
      name: data.name,
      full_address: data.full_address,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      cover_image_path: data.cover_image_path,
      user_id:data.user_id

    };

    storeRestaurant({
      variables: {
        input: inputData,
      },
    })
      .then((response) => {
        dispatch({ type: actions.ADD_ITEM, item: response.data.createRestaurant });
        successToast({ message: "Restaurant Created Successfully", toastId });
      })
      .catch((error) => {
        console.log(error);
        errorToast({ message: "Failed To Create Restaurant", toastId });
      });
  };
  const handleUpdate = async (id, data) => {
    const toastId = `loading-update-restaurant-${id}`;
    loadingToast({ message: "Updating Restaurant", toastId });

    if (data.photo) {
      const uploadFileResponse = await uploadFileApi.request(
        data.photo,
        "restaurants/photos"
      );

      data.photo_path = uploadFileResponse.data;
    }

    const inputData = {
      name: data.name,
      full_address: data.full_address,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      cover_image_path: data.cover_image_path,
      user_id:data.user_id

    };


    updateRestaurant({
      variables: {
        id: id,
        input: inputData,
      },
    })
      .then((response) => {
        dispatch({
          type: actions.UPDATE_ITEM,
          id: id,
          item: response.data.updateRestaurant,
        });
        successToast({ message: "Restaurant Updated Successfully", toastId });
      })
      .catch((error) => {
        console.log(error);
        errorToast({ message: "Failed To Update Restaurant", toastId });
      });
  };
  const handleDelete = (id) => {
    const toastId = `loading-delete-restaurant-${id}`;
    loadingToast({ message: "Deleting Restaurant", toastId });

    deleteRestaurant({
      variables: {
        id,
      },
    })
      .then((res) => {
        dispatch({ type: actions.REMOVE_ITEM, id: id });
        successToast({ message: "Restaurant Deleted Successfully", toastId });
        return res;
      })
      .catch((err) => {
        errorToast({ message: "Failed To Delete Restaurant", toastId });
        return err;
      });
  };
  const handleSearch = (string) => {
    refetchRestaurants({
      filter: `%${string}%`,
    });
  };
  return (
    <>
      <Datatable
        heads={tableHeads}
        data={state.data}
        title="Restaurants list"
        description="See information about all restaurants"
        addButtonLabel="Add Restaurant"
        handleAdd={handleAdd}
        handleSearch={handleSearch}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        RowCells={RestaurantRowCells}
        FormComponent={RestaurantForm}
      />
    </>
  );
};

export default RestaurantsDataTable;
