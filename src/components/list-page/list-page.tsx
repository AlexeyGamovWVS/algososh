import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import styles from "./list.module.css";
import { TCircle, btnNames } from "../../types/allTypes";
import { Circle } from "../ui/circle/circle";

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ stringInput: "", inInput: undefined });
  const [isLoading, setLoading] = useState(false);
  const [arr, setArr] = useState<TCircle[]>([]);
  const [activeBtn, setActiveBtn] = useState<btnNames | null>(null);

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.listMenu}>
        <div className={styles.listMenu__row}>
          <Input
            name="stringInput"
            placeholder="Введите текст"
            type="text"
            maxLength={4}
            isLimitText={true}
            onChange={handleChange}
            value={values.stringInput}
            disabled={isLoading}
						extraClass={styles.input}
          />
          <Button
            text="Добавить в Head"
            type="button"
            // onClick={handleAddHead}
            disabled={isLoading || values.stringInput === ""}
            isLoader={isLoading && activeBtn === btnNames.addInHead}
						extraClass={styles.btn_size_s}
          />
          <Button
            text="Добавить в Tail"
            type="button"
            // onClick={handleAddTail}
            disabled={isLoading || values.stringInput === ""}
            isLoader={isLoading && activeBtn === btnNames.addInTail}
						extraClass={styles.btn_size_s}
          />
          <Button
            text="Удалить из Head"
            type="button"
            // onClick={handleRemoveItem}
            // disabled={isLoading || stack.isEmpty()}
            isLoader={isLoading && activeBtn === btnNames.removeHead}
						extraClass={styles.btn_size_s}
          />
          <Button
            text="Удалить из Tail"
            type="button"
            // onClick={handleRemoveItem}
            // disabled={isLoading || stack.isEmpty()}
            isLoader={isLoading && activeBtn === btnNames.removeTail}
						extraClass={styles.btn_size_s}
          />
        </div>
        <div className={styles.listMenu__row}>
          <Input
            name="inInput"
            placeholder="Введите индекс"
            type="number"
            isLimitText={false}
            onChange={handleChange}
            value={values.inInput}
            disabled={isLoading} //или нет возможности так как список пуст
						extraClass={styles.input}
          />
          <Button
            text="Добавить по индексу"
            type="button"
            // onClick={handleAddHead}
            disabled={isLoading || values.inInput === undefined}
            isLoader={isLoading && activeBtn === btnNames.addByIdx}
						extraClass={styles.btn_size_m}
          />
          <Button
            text="удалить по индексу"
            type="button"
            // onClick={handleAddTail}
            disabled={isLoading} // или пустой список
            isLoader={isLoading && activeBtn === btnNames.removeByIdx}
						extraClass={styles.btn_size_m}
          />
        </div>
      </div>
      <ul className={styles.list}>
        {arr?.map((item, index) => {
          return (
            <li key={index}>
              <Circle
                letter={item.value}
                index={index}
                state={item.color}
                // head={index === stack.size() - 1 ? "top" : ""}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
