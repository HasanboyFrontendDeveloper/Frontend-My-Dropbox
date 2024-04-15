import { useState } from "react";

const useForm = (initialState) => {
  const [value, setValue] = useState(initialState);

  const changeHandler = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return [value, changeHandler];
};

export default useForm;
