import actions from "./actions";

export const restaurantFormReducer = (state, action) => {
  switch (action.type) {
    case actions.LOAD_USER_DATA:
      return {
        ...state,
        ...action.restaurant,
      };
    case actions.HANDEL_INPUT_CHANGE:
      console.log(action.field);
      console.log(action.payload);

      return {
        ...state,
        [action.field]: action.payload,
      };
    case actions.CLEAR_PHOTO:
      return {
        ...state,
        cover_image_path: null,
        photo: null,
      };
    case actions.UPLOAD_PHOTO:
      return {
        ...state,
        photo: action.photo,
        cover_image_path: URL.createObjectURL(action.photo),
      };
    case actions.LOAD_USERS:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};
