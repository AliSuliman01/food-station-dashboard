import { useEffect } from "react";
import Datatable from "../../../../components/Datatable";
import IngredientRowCells from "../IngredientRowCells";
import IngredientsGQL from "../../../../gql/ingredients";
import { useMutation } from "@apollo/client";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../../../helpers/toasts";
import { useReducer } from "react";
import IngredientForm from "../IngredientForm";
import ingredientsDataTableReducer from "./reducer";
import actions from "./actions";
import useApi from "../../../../hooks/useApi";
import FilesApi from "../../../../api/files";
import useQueryWithLoading from "../../../../hooks/useQueryWithLoading";

const tableHeads = ["Ingredient", "Created At", ""];

export default () => {
  const ingredientsDatatableInitialState = {
    data: [],
  };

  const [state, dispatch] = useReducer(
    ingredientsDataTableReducer,
    ingredientsDatatableInitialState
  );

  const { data: ingredientsData, refetch: refetchIngredients } = useQueryWithLoading(
    IngredientsGQL.GET_INGREDIENTS,
    {
      fetchPolicy: "no-cache",
    }
  );

  const uploadFileApi = useApi(FilesApi.uploadFile);

  const [storeIngredient] = useMutation(IngredientsGQL.STORE_INGREDIENT);
  const [updateIngredient] = useMutation(IngredientsGQL.UPDATE_INGREDIENT);
  const [deleteIngredient] = useMutation(IngredientsGQL.DELETE_INGREDIENT);

  useEffect(() => {
    if (ingredientsData?.ingredients)
      dispatch({ type: actions.LOAD_DATA, data: ingredientsData?.ingredients });
  }, [ingredientsData]);

  const handleAdd = async (data) => {
    const toastId = `loading-create-ingredient`;
    loadingToast({ message: "Creating Ingredient", toastId });

    Promise.all(
      data.images.map(async (image) => {
        const uploadFileResponse = await uploadFileApi.request(
          image.photo,
          "ingredients/photos"
        );
        return {
          path: uploadFileResponse.data,
          is_main: image.is_main,
        };
      })
    )
      .then((inputImages) => {

        return {
          translations: {
            upsert: data.translations,
          },
          images: {
            create: inputImages
          },
          
        };
      })
      .then((inputData) => {
        storeIngredient({
          variables: {
            input: inputData,
          },
        })
          .then((response) => {
            dispatch({
              type: actions.ADD_ITEM,
              item: response.data.createIngredient,
            });
            successToast({ message: "Ingredient Created Successfully", toastId });
          })
          .catch((error) => {
            console.log(error);
            errorToast({ message: "Failed To Create Ingredient", toastId });
          });
      });
  };
  const handleUpdate = async (id, data) => {
    const toastId = `loading-update-ingredient-${id}`;
    loadingToast({ message: "Update Ingredient", toastId });

    console.log(data.images);
    Promise.all(
      data.images.map(async ({ photo, path, is_main }) => {
        if (photo) {
          const uploadFileResponse = await uploadFileApi.request(
            photo,
            "ingredients/photos"
          );
          path = uploadFileResponse.data;
        }
        return {
          path,
          is_main,
        };
      })
    )
      .then((inputImages) => {

        return {
          translations: {
            upsert: data.translations,
          },
          images: {
            create: inputImages,
            delete: data.deletedImages
          },
          
        };
      })
      .then((inputData) => {
        updateIngredient({
          variables: {
            id,
            input: inputData,
          },
        })
          .then((response) => {
            dispatch({
              type: actions.UPDATE_ITEM,
              id,
              item: response.data.updateIngredient,
            });
            successToast({ message: "Ingredient Updated Successfully", toastId });
          })
          .catch((error) => {
            console.log(error);
            errorToast({ message: "Failed To Update Ingredient", toastId });
          });
      });
  };

  const handleDelete = (id) => {
    const toastId = `loading-delete-ingredient-${id}`;
    loadingToast({ message: "Deleting Ingredient", toastId });

    deleteIngredient({
      variables: {
        id,
      },
    })
      .then((res) => {
        dispatch({ type: actions.REMOVE_ITEM, id: id });
        successToast({ message: "Ingredient Deleted Successfully", toastId });
        return res;
      })
      .catch((err) => {
        errorToast({ message: "Failed To Delete Ingredient", toastId });
        return err;
      });
  };
  const handleSearch = (string) => {
    refetchIngredients({
      filter: `%${string}%`,
    });
  };
  return (
    <>
      <Datatable
        heads={tableHeads}
        data={state.data}
        title="Ingredients list"
        description="See information about all ingredients"
        addButtonLabel="Add Ingredient"
        handleAdd={handleAdd}
        handleSearch={handleSearch}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        RowCells={IngredientRowCells}
        FormComponent={IngredientForm}
      />
    </>
  );
};
