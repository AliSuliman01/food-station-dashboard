import actions from "./actions";

export const dataTableReducer = (state, action) => {
  switch (action.type) {
    case actions.OPEN_FORM: {
      return {
        ...state,
        isFormOpen: action.value ?? true,
        objectToEdit: action.objectToEdit ?? null,
      };
    }
    default:
    return state
  }
};
