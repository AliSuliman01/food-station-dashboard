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
import { useContext } from "react";
import { categoryContext } from "../CategoryDataTable";
const CategoryForm = ({ onCreate, onUpdate, objectToEdit }) => {
  const productFormInitialState = {
    id: null,
    translations: [],
    parent_category: {},
    main_image: {},
    images: [],
    deletedImages: [],
    deletedTranslations: [],
  };

  const [formState, formDispatch] = useReducer(
    productFormReducer,
    productFormInitialState
  );

  const animatedComponents = makeAnimated();
  const categories = useContext(categoryContext);

  useEffect(() => {
    if (objectToEdit) {
      formDispatch({
        type: actions.LOAD_DATA,
        data: objectToEdit,
      });
    }
  }, [objectToEdit]);

  const handleStateChange = (key, value) => {
    formDispatch({
      type: actions.SET_STATE,
      key,
      value,
    });
  };
  const handleTranslationsChange = (translations) => {
    const deletedTranslations = formState.translations
    .filter((translation) => translation.id)
    .map((translation) => translation.id)
    .filter(
      (id) =>
        !translations
          .filter((translation) => translation.id)
          .map((translation) => translation.id)
          .includes(id)
    );
    formDispatch({
      type: actions.LOAD_DATA,
      data: {
        deletedTranslations: [...formState.deletedTranslations, ...deletedTranslations],
        translations: translations,
      },
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
    const images = [
      ...formState.images.map(({ photo, is_main }) => ({ photo, is_main })),
    ];

    if (formState.main_image.is_main) images.push(formState.main_image);

    onUpdate(objectToEdit.id, {
      translations: formState.translations,
      parent_category_id: formState?.parent_category?.id,
      images: images,
      deletedImages: formState.deletedImages,
      deletedTranslations: formState.deletedTranslations,
    });
  };

  const handleCreate = () => {
    const images = [
      ...formState.images.map(({ photo, is_main }) => ({ photo, is_main })),
    ];

    if (formState.main_image.is_main) images.push(formState.main_image);

    onCreate({
      translations: formState.translations,
      parent_category_id: formState?.parent_category.id,
      images: images,
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
                handleTranslationsChange(translations)
              }
            />

            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Parent Category
            </Typography>

            <Select
              onChange={(e) => handleStateChange("parent_category", e.value)}
              value={{
                label: formState.parent_category?.translation?.name,
                value: formState.parent_category,
              }}
              options={categories.map((category) => {
                return {
                  label: category?.translation?.name,
                  value: category,
                };
              })}
            />

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

export default CategoryForm;
