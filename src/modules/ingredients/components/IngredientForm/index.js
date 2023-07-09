import {
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { useEffect, useReducer } from "react";
import ingredientFormReducer from "./reducer";
import actions from "./actions";
import TranslationsForm from "../../../../components/form/TranslationsForm";
import ImagesForm from "../../../../components/form/ImagesForm";
import UploadAndPreviewImage from "../../../../components/form/UploadAndPreviewImage";
import makeAnimated from "react-select/animated";
import MultiSelectForm from "../../../../components/form/MultiSelectForm";
import CategoryGQL from "../../../../gql/category";
import { useQuery } from "@apollo/client";

const IngredientForm = ({ onCreate, onUpdate, objectToEdit }) => {
  const ingredientFormInitialState = {
    id: null,
    translations: [],
    main_image: {},
    categories: [],
    images: [],
    deletedImages: [],
    allCategories: [],
  };

  const [formState, formDispatch] = useReducer(
    ingredientFormReducer,
    ingredientFormInitialState
  );

  const animatedComponents = makeAnimated();
  const { data: categoriesData } = useQuery(CategoryGQL.GET_CATEGORIES);

  useEffect(() => {
    if (objectToEdit) {
      formDispatch({
        type: actions.LOAD_DATA,
        data: {
          ...objectToEdit,
          categories: objectToEdit.categories.map((category) => ({
            label: category.translation.name,
            value: category.id,
          })),
        },
      });
    }
  }, [objectToEdit]);

  useEffect(() => {
    if (categoriesData?.categories) {
      formDispatch({
        type: actions.SET_STATE,
        key: "allCategories",
        value: categoriesData?.categories,
      });
    }
  }, [categoriesData]);

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
    onUpdate(objectToEdit.id, {
      translations: formState.translations,
      images: [
        ...[formState.main_image].filter(({path}) => path),
        ...formState.images.map(({ photo, is_main }) => ({ photo, is_main })),
      ],
      deletedImages: formState.deletedImages,
      categories: formState.categories.map((category) =>
        parseInt(category.value)
      ),
    });
  };

  const handleCreate = () => {
    console.log(formState);
    onCreate({
      translations: formState.translations,
      images: [
        ...[formState.main_image].filter(({path}) => path),
        ...formState.images.map(({ photo, is_main }) => ({ photo, is_main })),
      ],
      categories: formState.categories.map((category) =>
        parseInt(category.value)
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
              onRightClick={handleImageRightClick}
            />

            <TranslationsForm
              data={objectToEdit?.translations}
              onChange={(translations) =>
                handleStateChange("translations", translations)
              }
            />
            
            <MultiSelectForm
              label="Categories"
              selectComponents={animatedComponents}
              selectValue={formState.categories}
              selectOptions={formState.allCategories.map((category) => {
                return {
                  label: category.translation.name,
                  value: category.id,
                };
              })}
              selectOnChange={(selectedCategories) => {
                handleStateChange("categories", selectedCategories);
              }}
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

export default IngredientForm;
