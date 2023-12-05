import React, { useState } from "react";
import styles from "./string.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay, swap } from "../../utils/utils";
import { TCircle } from "../../types/allTypes";

const getStringArr = (string: string) => {
  return string.split("").map((letter) => {
    return {
      value: letter,
      color: ElementStates.Default,
    };
  });
};

export const StringComponent: React.FC = () => {
  const { values, handleChange } = useForm({ stringInput: "" });
  const [isLoading, setLoading] = useState(false);
  const [stringArr, setStringArr] = useState<TCircle[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await reverseString(values.stringInput!);
    setLoading(false);
  };

  const reverseString = async (string: string) => {
    const simbolsArr = getStringArr(string);
    setStringArr(simbolsArr);
    let start = 0;
    let end = simbolsArr.length - 1;

    while (start < end) {
      simbolsArr[start].color = ElementStates.Changing;
      simbolsArr[end].color = ElementStates.Changing;

      await delay(DELAY_IN_MS);
      swap(simbolsArr, start, end);

      simbolsArr[start].color = ElementStates.Modified;
      simbolsArr[end].color = ElementStates.Modified;

      start++;
      end--;

      simbolsArr[start].color = ElementStates.Changing;
      simbolsArr[end].color = ElementStates.Changing;
      setStringArr([...simbolsArr]);
    }

    simbolsArr[start].color = ElementStates.Modified;
    simbolsArr[end].color = ElementStates.Modified;
    setStringArr([...simbolsArr]);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="stringInput"
          placeholder="Введите текст"
          type="text"
          maxLength={11}
          isLimitText={true}
          onChange={handleChange}
          value={values.stringInput}
          disabled={isLoading}
        />
        <Button
          type="submit"
          text="Развернуть"
          disabled={!values.stringInput}
          isLoader={isLoading}
        />
      </form>
      <ul className={styles.circles}>
        {stringArr?.map((simbol, index) => {
          return (
            <li key={index}>
              <Circle letter={simbol.value} state={simbol.color} />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
