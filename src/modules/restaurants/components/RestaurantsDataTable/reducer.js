import actions from "./actions";

export const restaurantsDataTableReducer = (state, action) => {
  switch (action.type) {
    case actions.LOAD_DATA: {
      return {
        ...state,
        data: action.data,
      };
    }
    case actions.REMOVE_ITEM: {
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.id),
      };
    }
    case actions.ADD_ITEM: {
      return {
        ...state,
        data: [action.item, ...state.data],
      };
    }
    case actions.UPDATE_ITEM: {
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.id ? action.item : item
        ),
      };
    }
  }
};
