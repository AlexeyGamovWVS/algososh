import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
import { useForm } from "../../hooks/useForm";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TCircle } from "../../types/allTypes";

export const StackPage: React.FC = () => {
  const { values, handleChange } = useForm({ stringInput: "" });
  const [isLoading, setLoading] = useState(false);
	const [arr, setArr] = useState<TCircle[]>([]);

  const handleAddItem = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    // addItemToStack();
    setLoading(false);
  };

  const handleRemoveItem = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    // removeItemFromStack();
    setLoading(false);
  };

  const handleClearStack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    // clearStack();
    setLoading(false);
  };
  return (
    <SolutionLayout title="Стек">
      <div className={styles.stackMenu}>
        <Input
          name="stringInput"
          placeholder="Введите текст"
          type="text"
          maxLength={4}
          isLimitText={true}
          onChange={handleChange}
          value={values.stringInput}
          disabled={isLoading}
        />
        <Button
          text="Добавить"
          type="button"
          onClick={handleAddItem}
          disabled={isLoading || values.stringInput === ""}
          isLoader={isLoading}
        />
        <Button
          text="Удалить"
          type="button"
          onClick={handleRemoveItem}
          disabled={isLoading || values.stringInput === ""}
          isLoader={isLoading}
        />
        <Button
          text="Сбросить"
          type="button"
          onClick={handleClearStack}
          disabled={isLoading || values.stringInput === ""}
          isLoader={isLoading}
          extraClass={styles.clearBtn}
        />
      </div>
      <ul className={styles.stackList}>
        {arr?.map((item, index) => {
          return (
            <li key={index}>
              <Circle
                letter={item.value}
                index={index}
                state={item.color}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
