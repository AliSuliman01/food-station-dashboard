import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import { BanknotesIcon } from "@heroicons/react/24/solid";
import { useReducer } from "react";
import { userFormReducer } from "./UserFormReducer";
import actions from "./actions";

const UserForm = ({ handleAdd, handleUpdate, objectToEdit }) => {
  const userFormInitialState = {
    name: objectToEdit?.name,
    email: objectToEdit?.email,
    password: "",
    photo_path: objectToEdit?.photo_path,
    photo: null,
  };

  const [formState, formDispatch] = useReducer(
    userFormReducer,
    userFormInitialState
  );

  const handleTextInputChange = (e) => {
    formDispatch({
      type: actions.HANDE_INPUT_CHANGE,
      field: e.target.name,
      payload: e.target.value,
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
        {formState.photo_path ? (
          <>
            <img src={formState.photo_path} className="object-cover relative" />
            <div className="w-full flex justify-center">
              <Button
                className="bg-main relative overflow-hidden my-3"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  formDispatch({ type: actions.CLEAR_PHOTO });
                }}
              >
                Clear
              </Button>
            </div>
          </>
        ) : (
          <div className="grid place-items-center py-8 px-4 text-center bg-main ">
            <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
              <BanknotesIcon className="h-10 w-10" />
            </div>
            <Typography variant="h4" color="white">
              Upload Photo
            </Typography>
          </div>
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
                onChange={handleTextInputChange}
              />
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-4 font-medium"
              >
                Email
              </Typography>
              <Input
                type="email"
                label="Email Address"
                name="email"
                value={formState.email}
                onChange={handleTextInputChange}
              />
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-4 font-medium"
              >
                Password
              </Typography>
              <Input
                type="password"
                label="Password"
                name="password"
                onChange={handleTextInputChange}
              />
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

export default UserForm;
