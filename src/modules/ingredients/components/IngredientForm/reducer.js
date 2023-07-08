import actions from "./actions";

export default (state, action) => {
  switch (action.type) {
    case actions.LOAD_DATA:
      return {
        ...state,
        ...action.data,
      };
    case actions.SET_STATE:
      return {
        ...state,
        [action.key]: action.value,
      };
    case actions.CLEAR_PHOTO:{
      const deletedImages = [...state.deletedImages];
      if (state.main_image?.id) {
        deletedImages.push(state.main_image.id);
      }
      return {
        ...state,
        main_image: {},
        deletedImages
      };}
    case actions.UPLOAD_PHOTO:{
      const image_path = URL.createObjectURL(action.photo);
      const deletedImages = [...state.deletedImages];
      if (state.main_image?.id) {
        deletedImages.push(state.main_image.id);
      }
      return {
        ...state,
        main_image: {
          photo: action.photo,
          path: image_path,
          is_main: true,
        },
        deletedImages:deletedImages
      };}
    case actions.ADD_PHOTO:
      return {
        ...state,
        images: [
          ...state.images,
          {
            photo: action.photo,
            path: URL.createObjectURL(action.photo),
            is_main: false,
          },
        ],
      };
    case actions.REMOVE_PHOTO:
      return {
        ...state,
        images: state.images.filter(
          (image) => image.path !== action.photo.path
        ),
        deletedImages: action.photo.id
          ? [...state.deletedImages, action.photo.id]
          : state.deletedImages,
      };
    default:
      return state;
  }
};
