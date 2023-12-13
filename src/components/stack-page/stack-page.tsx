import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
import { useForm } from "../../hooks/useForm";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TCircle } from "../../types/allTypes";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  isEmpty: () => boolean;
  size: () => number;
  elements: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => (this.size() > 0 ? this.container[this.size() - 1] : null);

  clear = () => {
    this.container = [];
  };

  size = () => this.container.length;
  elements = () => this.container;
  isEmpty = () => (this.size() > 0 ? false : true);
}

export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ stringInput: "" });
  const [isLoading, setLoading] = useState(false);
  const [arr, setArr] = useState<TCircle[]>([]);
  const stack = new Stack<TCircle>();

  const handleAddItem = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    stack.push({
      value: values.stringInput!,
      color: ElementStates.Changing,
    });
    setArr([...stack.elements()]);
    setValues({ stringInput: "" });
    await delay(SHORT_DELAY_IN_MS);
    stack.peak()!.color = ElementStates.Default;
    setLoading(false);
  };

  const handleRemoveItem = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    if (stack.size() > 0) {
      stack.peak()!.color = ElementStates.Changing;
      await delay(SHORT_DELAY_IN_MS);
      stack.pop();
      setArr([...stack.elements()]);
    }
    setLoading(false);
  };

  const handleClearStack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    stack.clear();
    setArr([...stack.elements()]);
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
              <Circle letter={item.value} index={index} state={item.color} head={index === stack.size() - 1 ? "top" : ''}/>
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
