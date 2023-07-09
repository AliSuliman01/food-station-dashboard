import { useEffect } from "react";
import Datatable from "../../../../components/Datatable";
import CategoryRowCells from "../CategoryRowCells";
import CategoryGQL from "../../../../gql/category";
import { useMutation } from "@apollo/client";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../../../helpers/toasts";
import { useReducer } from "react";
import CategoryForm from "../CategoryForm";
import categoryDataTableReducer from "./reducer";
import actions from "./actions";
import useApi from "../../../../hooks/useApi";
import FilesApi from "../../../../api/files";
import useQueryWithLoading from "../../../../hooks/useQueryWithLoading";
import { createContext } from "react";

const tableHeads = ["ID", "Category", "Static Name", "Slug", "Created At", ""];

export const categoryContext = createContext();

export default () => {
  const categoryDatatableInitialState = {
    data: [],
  };

  const [state, dispatch] = useReducer(
    categoryDataTableReducer,
    categoryDatatableInitialState
  );

  const { data: categoryData, refetch: refetchCategory } = useQueryWithLoading(
    CategoryGQL.GET_CATEGORIES,
    {
      fetchPolicy: "no-cache",
    }
  );

  const uploadFileApi = useApi(FilesApi.uploadFile);

  const [storeCategory] = useMutation(CategoryGQL.STORE_CATEGORY);
  const [updateCategory] = useMutation(CategoryGQL.UPDATE_CATEGORY);
  const [deleteCategory] = useMutation(CategoryGQL.DELETE_CATEGORY);

  useEffect(() => {
    if (categoryData?.categories)
      dispatch({ type: actions.LOAD_DATA, data: categoryData?.categories });
  }, [categoryData]);

  const handleAdd = async (data) => {
    const toastId = `loading-create-category`;
    loadingToast({ message: "Creating Category", toastId });

    Promise.all(
      data.images.map(async (image) => {
        const uploadFileResponse = await uploadFileApi.request(
          image.photo,
          "category/photos"
        );
        return {
          path: uploadFileResponse.data,
          is_main: image.is_main,
        };
      })
    )
      .then((inputImages) => {
        return {
          name:data.name,
          translations: {
            upsert: data.translations,
          },
          parent_category: {
            connect: data.parent_category_id,
          },
          images: {
            create: inputImages,
          },
        };
      })
      .then((inputData) => {
        storeCategory({
          variables: {
            input: inputData,
          },
        })
          .then((response) => {
            dispatch({
              type: actions.ADD_ITEM,
              item: response.data.createCategory,
            });
            successToast({ message: "Category Created Successfully", toastId });
          })
          .catch((error) => {
            console.log(error);
            errorToast({ message: "Failed To Create Category", toastId });
          });
      });
  };
  const handleUpdate = async (id, data) => {
    const toastId = `loading-update-category-${id}`;
    loadingToast({ message: "Update Category", toastId });

    Promise.all(
      data.images.map(async ({ photo, path, is_main }) => {
        if (photo) {
          const uploadFileResponse = await uploadFileApi.request(
            photo,
            "category/photos"
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
          name:data.name,
          translations: {
            upsert: data.translations,
            delete: data.deletedTranslations,
          },
          parent_category: {
            connect: data.parent_category_id,
          },
          images: {
            create: inputImages,
            delete: data.deletedImages,
          },
        };
      })
      .then((inputData) => {
        updateCategory({
          variables: {
            id,
            input: inputData,
          },
        })
          .then((response) => {
            dispatch({
              type: actions.UPDATE_ITEM,
              id,
              item: response.data.updateCategory,
            });
            successToast({ message: "Category Updated Successfully", toastId });
          })
          .catch((error) => {
            console.log(error);
            errorToast({ message: "Failed To Update Category", toastId });
          });
      });
  };

  const handleDelete = (id) => {
    const toastId = `loading-delete-category-${id}`;
    loadingToast({ message: "Deleting Category", toastId });

    deleteCategory({
      variables: {
        id,
      },
    })
      .then((res) => {
        dispatch({ type: actions.REMOVE_ITEM, id: id });
        successToast({ message: "Category Deleted Successfully", toastId });
        return res;
      })
      .catch((err) => {
        errorToast({ message: "Failed To Delete Category", toastId });
        return err;
      });
  };
  const handleSearch = (string) => {
    refetchCategory({
      filter: `%${string}%`,
    });
  };
  return (
    <categoryContext.Provider value={state.data}>
      <Datatable
        heads={tableHeads}
        data={state.data}
        title="Category list"
        description="See information about all category"
        addButtonLabel="Add Category"
        handleAdd={handleAdd}
        handleSearch={handleSearch}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        RowCells={CategoryRowCells}
        FormComponent={CategoryForm}
      />
    </categoryContext.Provider>
  );
};
