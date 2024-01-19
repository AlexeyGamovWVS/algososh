// custom hook for any inputs of any forms
import { useState } from 'react';

interface IInputValues {
  stringInput?: string;
  fiboInput?: number;
  inInput?: number | string;
}

export function useForm(inputValues: IInputValues) {
  const [values, setValues] = useState(inputValues || {});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
