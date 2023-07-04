import { useEffect } from "react";
import Datatable from "../../../../components/Datatable";
import ProductRowCells from "../ProductRowCells";
import ProductsGQL from "../../../../gql/products";
import { useMutation } from "@apollo/client";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../../../helpers/toasts";
import { useReducer } from "react";
import ProductForm from "../ProductForm";
import productsDataTableReducer from "./reducer";
import actions from "./actions";
import useApi from "../../../../hooks/useApi";
import FilesApi from "../../../../api/files";
import useQueryWithLoading from "../../../../hooks/useQueryWithLoading";

const tableHeads = ["Product", "Price", "Ingredients", "Created At", ""];

export default () => {
  const productsDatatableInitialState = {
    data: [],
  };

  const [state, dispatch] = useReducer(
    productsDataTableReducer,
    productsDatatableInitialState
  );

  const { data: productsData, refetch: refetchProducts } = useQueryWithLoading(
    ProductsGQL.GET_PRODUCTS,
    {
      fetchPolicy: "no-cache",
    }
  );

  const uploadFileApi = useApi(FilesApi.uploadFile);

  const [storeProduct] = useMutation(ProductsGQL.STORE_PRODUCT);
  const [updateProduct] = useMutation(ProductsGQL.UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(ProductsGQL.DELETE_PRODUCT);

  useEffect(() => {
    console.log(productsData?.products);
    if (productsData?.products)
      dispatch({ type: actions.LOAD_DATA, data: productsData?.products });
  }, [productsData]);

  const handleAdd = async (data) => {
    const toastId = `loading-create-product`;
    loadingToast({ message: "Creating Product", toastId });

    console.log(data.images);
    Promise.all(
      data.images.map(async (image) => {
        const uploadFileResponse = await uploadFileApi.request(
          image.photo,
          "products/photos"
        );
        return {
          path: uploadFileResponse.data,
          is_main: image.is_main,
        };
      })
    )
      .then((inputImages) => {
        console.log(inputImages);

        return {
          price: data.price,
          translations: {
            upsert: data.translations,
          },
          restaurant: {
            connect: data.restaurant_id,
          },
          images: {
            create: inputImages,
          },
          ingredients: {
            connect: data.ingredients,
          },
        };
      })
      .then((inputData) => {
        storeProduct({
          variables: {
            input: inputData,
          },
        })
          .then((response) => {
            dispatch({
              type: actions.ADD_ITEM,
              item: response.data.createProduct,
            });
            successToast({ message: "Product Created Successfully", toastId });
          })
          .catch((error) => {
            console.log(error);
            errorToast({ message: "Failed To Create Product", toastId });
          });
      });
  };
  const handleUpdate = async (id, data) => {
    const toastId = `loading-update-product-${id}`;
    loadingToast({ message: "Update Product", toastId });

    console.log(data.images);
    Promise.all(
      data.images.map(async ({ photo, path, is_main }) => {
        if (photo) {
          const uploadFileResponse = await uploadFileApi.request(
            photo,
            "products/photos"
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
        console.log(inputImages);

        return {
          price: data.price,
          translations: {
            upsert: data.translations,
          },
          restaurant: {
            connect: data.restaurant_id,
          },
          images: {
            create: inputImages,
            delete: data.deletedImages
          },
          ingredients: {
            sync: data.ingredients,
          },
        };
      })
      .then((inputData) => {
        updateProduct({
          variables: {
            id,
            input: inputData,
          },
        })
          .then((response) => {
            dispatch({
              type: actions.UPDATE_ITEM,
              id,
              item: response.data.updateProduct,
            });
            successToast({ message: "Product Updated Successfully", toastId });
          })
          .catch((error) => {
            console.log(error);
            errorToast({ message: "Failed To Update Product", toastId });
          });
      });
  };

  const handleDelete = (id) => {
    const toastId = `loading-delete-product-${id}`;
    loadingToast({ message: "Deleting Product", toastId });

    deleteProduct({
      variables: {
        id,
      },
    })
      .then((res) => {
        dispatch({ type: actions.REMOVE_ITEM, id: id });
        successToast({ message: "Product Deleted Successfully", toastId });
        return res;
      })
      .catch((err) => {
        errorToast({ message: "Failed To Delete Product", toastId });
        return err;
      });
  };
  const handleSearch = (string) => {
    refetchProducts({
      filter: `%${string}%`,
    });
  };
  return (
    <>
      <Datatable
        heads={tableHeads}
        data={state.data}
        title="Products list"
        description="See information about all products"
        addButtonLabel="Add Product"
        handleAdd={handleAdd}
        handleSearch={handleSearch}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        RowCells={ProductRowCells}
        FormComponent={ProductForm}
      />
    </>
  );
};
