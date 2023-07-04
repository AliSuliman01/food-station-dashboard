import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useReducer } from "react";
import { restaurantFormReducer } from "./reducer";
import actions from "./actions";
import useQueryWithLoading from "../../../../hooks/useQueryWithLoading";
import UsersGQL from "../../../../gql/users";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import userEvent from "@testing-library/user-event";
import { useQuery } from "@apollo/client";

const ImageSection = ({ image_path, clearImage }) => {
  return (
    <>
      <img src={image_path} className="object-cover relative" />
      <div className="w-full flex justify-center">
        <Button
          className="bg-main relative overflow-hidden my-3"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            clearImage();
          }}
        >
          Clear
        </Button>
      </div>
    </>
  );
};
const ImagePlaceholderSection = () => {
  return (
    <div className="grid place-items-center py-8 px-4 text-center bg-main ">
      <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
        <BanknotesIcon className="h-10 w-10" />
      </div>
      <Typography variant="h4" color="white">
        Upload Photo
      </Typography>
    </div>
  );
};

const RestaurantForm = ({ handleAdd, handleUpdate, objectToEdit }) => {
  const restaurantFormInitialState = {
    name: objectToEdit?.name,
    latitude: objectToEdit?.latitude,
    longitude: objectToEdit?.longitude,
    full_address: objectToEdit?.full_address,
    cover_image_path: objectToEdit?.cover_image_path,
    user_id: objectToEdit?.user_id,
    photo: null,
    users: [],
  };

  const [formState, formDispatch] = useReducer(
    restaurantFormReducer,
    restaurantFormInitialState
  );

  const { data: usersData } = useQuery(UsersGQL.GET_USERS);

  useEffect(() => {
    if (usersData?.users) {
      formDispatch({ type: actions.LOAD_USERS, users: usersData.users });
    }
  }, [usersData]);
  const handleTextInputChange = (e) => {
    formDispatch({
      type: actions.HANDEL_INPUT_CHANGE,
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleSelectChange = (key, value) => {
    formDispatch({
      type: actions.HANDEL_INPUT_CHANGE,
      field: key,
      payload: value,
    });
  };

  const previewImage = (e) => {
    if (e.target.files[0] != null) {
      formDispatch({
        type: actions.UPLOAD_PHOTO,
        photo: e.target.files[0],
      });
    }
  };

  const onSubmitUpdate = () => {
    handleUpdate(objectToEdit.id, formState);
  };

  const onSubmitAdd = () => {
    console.log('submit add', formState);
    handleAdd(formState);
  };

  return (
    <Card className="w-full max-w-[24rem]">
      <CardHeader
        floated={false}
        shadow={false}
        onClick={() => {
          document.getElementById("fileInput").click();
        }}
        className="m-0 rounded-b-none cursor-pointer"
      >
        {formState.cover_image_path ? (
          <ImageSection
            image_path={formState.cover_image_path}
            clearImage={() => formDispatch({ type: actions.CLEAR_PHOTO })}
          />
        ) : (
          <ImagePlaceholderSection />
        )}
      </CardHeader>
      <CardBody>
        <div className="overflow-visible">
          <form className="flex flex-col gap-4">
            <input type="file" id="fileInput" hidden onChange={previewImage} />
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-4 font-medium"
              >
                Name
              </Typography>
              <Input
                type="text"
                label="Name"
                name="name"
                value={formState.name}
                onChange={(e) => handleTextInputChange(e)}
              />
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-4 font-medium"
              >
                Full Address
              </Typography>
              <Input
                type="text"
                name="full_address"
                label="Full Address"
                value={formState.full_address}
                onChange={(e) => handleTextInputChange(e)}
              />
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-4 font-medium"
              >
                Location
              </Typography>
              <div className="flex items-center gap-4">
                <Input
                  type="text"
                  name="latitude"
                  label="Latitude"
                  value={formState.latitude}
                  containerProps={{ className: "min-w-[72px]" }}
                  onChange={(e) => handleTextInputChange(e)}
                />
                <Input
                  type="text"
                  label="Longitude"
                  name="longitude"
                  value={formState.longitude}
                  containerProps={{ className: "min-w-[72px]" }}
                  onChange={(e) => handleTextInputChange(e)}
                />
              </div>
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-4 font-medium"
              >
                Owner
              </Typography>
              <Select
                label="Select Owner"
                name="user_id"
                value={formState.user_id}
                onChange={(value) => handleSelectChange("user_id", value)}
              >
                {formState.users.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </div>
            <Button
              size="lg"
              className="relative h-12 bg-main"
              onClick={objectToEdit ? onSubmitUpdate : onSubmitAdd}
            >
              {objectToEdit ? "Update" : "Add"}
            </Button>
          </form>
        </div>
      </CardBody>
    </Card>
  );
};

export default RestaurantForm;
