import { Select, Option, Typography, Input } from "@material-tailwind/react";
import { useContext, useEffect, useReducer } from "react";
import { useState } from "react";
import { LanguagesContext } from "../../../App";
import actions from "./actions";
import reducer from "./reducer";

const lastTranslationObject = {
  name: "",
  language_code: "",
  isLast: true,
};

export default ({ data = [], onChange }) => {
  const langs = useContext(LanguagesContext);

  const initState = {
    translations: [lastTranslationObject],
    availableLanguages: langs,
  };

  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    if (data.length > 0) {
      dispatch({
        type: actions.LOAD_DATA,
        data: {
          translations: [...data, ...state.translations],
        },
      });
    }
  }, [data]);

  useEffect(() => {
    onChange(
      state.translations
        .filter(
          (transition) =>
            transition.language_code.length && transition.name.length
        )
        .map(({ id, name, language_code }) => ({ id, name, language_code }))
    );
  }, [state.translations]);

  const handleLanguageCodeChange = (index, language_code) => {
    dispatch({ type: actions.CHANGE_LANGUAGE_CODE, index, language_code });
  };

  const handleTranslationNameChange = (index, name) => {
    dispatch({ type: actions.CHANGE_NAME, index, name });
  };
  return (
    <div>
      <Typography
        variant="small"
        color="blue-gray"
        className="mb-4 font-medium"
      >
        Translations
      </Typography>
      {state.translations.map((translation, index) => {
        return (
          <div className=" flex justify-center mb-3" key={index}>
            <Select
              label="Lang"
              containerProps={{ className: "min-w-[70px] max-w-[70px] mr-2" }}
              value={translation.language_code}
              onChange={(value) => handleLanguageCodeChange(index, value)}
            >
              {state.availableLanguages.map((lang) => (
                <Option
                  key={lang.language_code}
                  value={lang.language_code}
                  className={lang.hidden ? "hidden" : ""}
                >
                  {lang.language_code}
                </Option>
              ))}
            </Select>
            <Input
              type="text"
              label="Name"
              value={translation.name}
              onChange={(e) =>
                handleTranslationNameChange(index, e.target.value)
              }
            />
          </div>
        );
      })}
    </div>
  );
};
