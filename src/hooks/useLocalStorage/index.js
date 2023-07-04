import { useState } from "react";

export default (key, defaultValue = "") => {
  let oldValue = localStorage.getItem(key);
  if (!oldValue) {
    oldValue = JSON.stringify(defaultValue);
    localStorage.setItem(key, oldValue);
  } else oldValue = JSON.parse(oldValue);

  const [state, setValue] = useState(oldValue);

  const setState = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return [state, setState];
};
