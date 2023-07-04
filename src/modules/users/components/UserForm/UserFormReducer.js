import actions from "./actions";

export const userFormReducer = (state, action) => {
  switch (action.type) {
    case actions.LOAD_USER_DATA:
      return {
        ...state,
        name: action.user.name,
        email: action.user.email,
        photo_path: action.user.photo_path,
      };
    case actions.HANDE_INPUT_CHANGE:
      return {
        ...state,
        [action.field]: action.payload,
      };
    case actions.CLEAR_PHOTO:
      return {
        ...state,
        photo_path: null,
        photo: null,
      };
    case actions.UPLOAD_PHOTO:
      return {
        ...state,
        photo: action.photo,
        photo_path: URL.createObjectURL(action.photo),
      };
    default:
      return state;
  }
};
