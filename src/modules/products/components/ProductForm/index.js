import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Option,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { useEffect, useReducer } from "react";
import productFormReducer from "./reducer";
import actions from "./actions";
import RestaurantGQL from "../../../../gql/restaurants";
import IngredientGQL from "../../../../gql/ingredients";
import { useQuery } from "@apollo/client";
import TranslationsForm from "../../../../components/form/TranslationsForm";
import ImageSection from "../../../../components/ImageSection";
import ImagePlaceholderSection from "../../../../components/ImagePlaceholderSection";
import ImagesForm from "../../../../components/form/ImagesForm";
import UploadAndPreviewImage from "../../../../components/form/UploadAndPreviewImage";
import InputForm from "../../../../components/form/InputForm";
import SelectForm from "../../../../components/form/SelectForm";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import ingredients from "../../../../gql/ingredients";

const ProductForm = ({ onCreate, onUpdate, objectToEdit }) => {
  const productFormInitialState = {
    id: null,
    price: null,
    translations: [],
    restaurant: {},
    main_image: {},
    images: [],
    deletedImages: [],
    ingredients: [],

    allRestaurants: [],
    allIngredients: [],
  };

  const [formState, formDispatch] = useReducer(
    productFormReducer,
    productFormInitialState
  );

  const animatedComponents = makeAnimated();
  const { data: restaurantsData } = useQuery(RestaurantGQL.GET_RESTAURANTS);
  const { data: ingredientsData } = useQuery(IngredientGQL.GET_INGREDIENTS);

  useEffect(() => {
    if (objectToEdit) {
      console.log(objectToEdit.translations);
      formDispatch({
        type: actions.LOAD_DATA,
        data: {
          ...objectToEdit,
          ingredients: objectToEdit.ingredients.map((ingredient) => ({
            label: ingredient.translation.name,
            value: ingredient.id,
          })),
        },
      });
    }
  }, [objectToEdit]);

  useEffect(() => {
    if (restaurantsData?.restaurants) {
      formDispatch({
        type: actions.LOAD_RESTAURANTS,
        allRestaurants: restaurantsData?.restaurants,
      });
    }
  }, [restaurantsData]);

  useEffect(() => {
    if (ingredientsData?.ingredients) {
      formDispatch({
        type: actions.LOAD_INGREDIENTS,
        allIngredients: ingredientsData?.ingredients,
      });
    }
  }, [ingredientsData]);

  const handleStateChange = (key, value) => {
    formDispatch({
      type: actions.SET_STATE,
      key,
      value,
    });
  };

  const setImage = (e) => {
    if (e.target.files[0] != null) {
      formDispatch({
        type: actions.UPLOAD_PHOTO,
        photo: e.target.files[0],
      });
    }
  };

  const clearImage = () => {
    formDispatch({ type: actions.CLEAR_PHOTO });
  };
  const handleSelectImage = (e) => {
    if (e.target.files[0] != null) {
      formDispatch({
        type: actions.ADD_PHOTO,
        photo: e.target.files[0],
      });
    }
  };

  const handleUpdate = () => {
    console.log(formState.translations);
    onUpdate(objectToEdit.id, {
      price: parseFloat(formState.price),
      translations: formState.translations,
      restaurant_id: formState?.restaurant.id,
      images: [
        ...[formState.main_image].filter(({path}) => path),
        ...formState.images.map(({ photo, is_main }) => ({ photo, is_main })),
      ],
      deletedImages: formState.deletedImages,
      ingredients: formState.ingredients.map((ingredient) =>
        parseInt(ingredient.value)
      ),
    });
  };

  const handleCreate = () => {
    console.log(formState);
    onCreate({
      price: parseFloat(formState.price),
      translations: formState.translations,
      restaurant_id: formState?.restaurant.id,
      images: [
        ...[formState.main_image].filter(({path}) => path),
        ...formState.images.map(({ photo, is_main }) => ({ photo, is_main })),
      ],
      ingredients: formState.ingredients.map((ingredient) =>
        parseInt(ingredient.value)
      ),
    });
  };

  const handleImageRightClick = (image) => {
    formDispatch({
      type: actions.REMOVE_PHOTO,
      photo: image,
    });
  };

  return (
    <Card className="w-full max-w-[24rem]">
      <CardHeader
        floated={false}
        shadow={false}
        className="m-0 rounded-b-none cursor-pointer"
      >
        <UploadAndPreviewImage
          imagePath={formState.main_image?.path}
          onSelectImage={setImage}
          onClearImage={clearImage}
        />
      </CardHeader>

      <CardBody>
        <div className="overflow-visible">
          <div className="flex flex-col gap-4">
            <ImagesForm
              images={formState.images}
              onSelectImage={handleSelectImage}
              onContextMenu={handleImageRightClick}
            />

            <TranslationsForm
              data={objectToEdit?.translations}
              onChange={(translations) =>
                handleStateChange("translations", translations)
              }
            />

            <InputForm
              label="Price"
              inputLabel="Price"
              value={formState.price}
              onChange={(e) => handleStateChange("price", e.target.value)}
            />

            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Restaurant
            </Typography>

            <Select
              onChange={(e) => handleStateChange("restaurant", e.value)}
              value={{
                label: formState.restaurant?.name,
                value: formState.restaurant,
              }}
              options={formState.allRestaurants.map((restaurant) => {
                return {
                  label: restaurant.name,
                  value: restaurant,
                };
              })}
            />

            <div id="ingredients-container">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-4 font-medium"
              >
                Ingredients
              </Typography>

              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                value={formState.ingredients}
                options={formState.allIngredients.map((ingredient) => {
                  return {
                    label: ingredient.translation.name,
                    value: ingredient.id,
                  };
                })}
                onChange={(selectedIngredients) => {
                  handleStateChange("ingredients", selectedIngredients);
                }}
              />
            </div>

            <Button
              size="lg"
              className="relative h-12 bg-main"
              onClick={objectToEdit ? handleUpdate : handleCreate}
            >
              {objectToEdit ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductForm;
