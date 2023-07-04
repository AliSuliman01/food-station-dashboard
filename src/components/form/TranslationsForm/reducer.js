import actions from "./actions";


const lastTranslationObject = {
    name: "",
    language_code: "",
    isLast: true,
  };

  
export default (state, action) => {
  switch (action.type) {
    case actions.LOAD_DATA:
      return {
        ...state,
        ...action.data,
      };

    case actions.CHANGE_LANGUAGE_CODE: {
      let newAvailableLanguages = [...state.availableLanguages];
      let newTranslations = [...state.translations];

      if (state.translations[action.index].language_code.length > 0)
        newAvailableLanguages = newAvailableLanguages.map((availableLanguage) =>
          availableLanguage.language_code ===
          newTranslations[action.index].language_code
            ? {
                ...availableLanguage,
                hidden: false,
              }
            : availableLanguage
        );

      newTranslations[action.index].language_code = action.language_code;

      newAvailableLanguages = newAvailableLanguages.map((availableLanguage) =>
        availableLanguage.language_code === action.language_code
          ? {
              ...availableLanguage,
              hidden: true,
            }
          : availableLanguage
      );

      return {
        ...state,
        availableLanguages: newAvailableLanguages,
        translations: newTranslations,
      };
    }
    case actions.CHANGE_NAME: {
      let newAvailableLanguages = [...state.availableLanguages];
      let newTranslations = [...state.translations];

      newTranslations[action.index].name = action.name;

      if (action.name.length === 0) {
        newAvailableLanguages = newAvailableLanguages.map((availableLanguage) =>
          availableLanguage.language_code ===
          newTranslations[action.index].language_code
            ? {
                ...availableLanguage,
                hidden: false,
              }
            : availableLanguage
        );

        newTranslations.splice(action.index, 1);

        if (
          newTranslations.filter((newTranslation) => newTranslation.isLast)
            .length === 0
        )
          newTranslations.push({...lastTranslationObject});
      } else if (newTranslations[action.index].isLast) {
        newTranslations[action.index].isLast = false;

        if (
          newAvailableLanguages.filter(
            (availableLanguage) => !availableLanguage.hidden
          ).length > 0
        )
          newTranslations.push({...lastTranslationObject});
      }

      return {
        ...state,
        availableLanguages: newAvailableLanguages,
        translations: newTranslations,
      };
    }
    default:
      return state;
  }
};
