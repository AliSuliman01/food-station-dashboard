import { IconButton, Menu, MenuItem } from "@material-tailwind/react";
import { useContext } from "react";
import { LanguagesContext } from "../../App";
import DropDown from "../DropDown";
import useLocalStorage from "../../hooks/useLocalStorage";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/20/solid";

export default () => {
  const languages = useContext(LanguagesContext);
  const [lang, setLang] = useLocalStorage("lang", "en");

  const handleLanguageChange = (language) => {
    setLang(language.language_code);
    window.location.reload();
  };
  return (
    <DropDown
      title={<GlobeAsiaAustraliaIcon className="h-[18px] w-[18px] text-blue-gray-500" />}
      withArrow={false}
      height={180}
      width={75}
    >
      {languages.map((language) => (
        <MenuItem
          className={`text-gray-700 block px-4 py-2 text-sm ${
            lang === language.language_code ? "bg-gray-100" : ""
          }`}
          onClick={() => handleLanguageChange(language)}
        >
          {language.language_code}
        </MenuItem>
      ))}
    </DropDown>
  );
};
