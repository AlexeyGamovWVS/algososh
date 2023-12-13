import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import styles from "./list.module.css";
import { TCircle, btnNames } from "../../types/allTypes";
import { Circle } from "../ui/circle/circle";
import shevron from "../../images/icons/shevron-r.svg";
import { delay, getRandomArr } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ stringInput: "", inInput: undefined });
  const [isLoading, setLoading] = useState(false);
  const [arr, setArr] = useState<TCircle[]>([]);
  const [activeBtn, setActiveBtn] = useState<btnNames | null>(null);

  useEffect(() => {
    setArr(getRandomArr(3, 5));
  }, []);

  const handleAddHead = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.addInHead);
    setLoading(true);
		// add
    setValues({ stringInput: '' });
    await delay(DELAY_IN_MS);
    // color
    setLoading(false);
    setActiveBtn(null);
  };

	const handleAddTail = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.addInTail);
    setLoading(true);
		// add
    setValues({ stringInput: '' });
    await delay(DELAY_IN_MS);
    // color
    setLoading(false);
    setActiveBtn(null);
  };

	const handleRemoveHead = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.removeHead);
    setLoading(true);
		// remove
    setValues({ stringInput: '' });
    await delay(DELAY_IN_MS);
    // color
    setLoading(false);
    setActiveBtn(null);
  };

	const handleRemoveTail = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.removeTail);
    setLoading(true);
		// remove
    setValues({ stringInput: '' });
    await delay(DELAY_IN_MS);
    // color
    setLoading(false);
    setActiveBtn(null);
  };

	const handleAddInd = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.addByIdx);
    setLoading(true);
		// add
    setValues({ stringInput: '', inInput: undefined });
    await delay(DELAY_IN_MS);
    // color
    setLoading(false);
    setActiveBtn(null);
  };

	const handleRemoveInd = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.addByIdx);
    setLoading(true);
		// remove
    setValues({ stringInput: '', inInput: undefined });
    await delay(DELAY_IN_MS);
    // color
    setLoading(false);
    setActiveBtn(null);
  };

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
            onClick={handleAddHead}
            disabled={isLoading || values.stringInput === ""}
            isLoader={isLoading && activeBtn === btnNames.addInHead}
            extraClass={styles.btn_size_s}
          />
          <Button
            text="Добавить в Tail"
            type="button"
            onClick={handleAddTail}
            disabled={isLoading || values.stringInput === ""}
            isLoader={isLoading && activeBtn === btnNames.addInTail}
            extraClass={styles.btn_size_s}
          />
          <Button
            text="Удалить из Head"
            type="button"
            onClick={handleRemoveHead}
            disabled={isLoading} // или хэд пуст
            isLoader={isLoading && activeBtn === btnNames.removeHead}
            extraClass={styles.btn_size_s}
          />
          <Button
            text="Удалить из Tail"
            type="button"
            onClick={handleRemoveTail}
            disabled={isLoading} // или тейл пуст
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
            onClick={handleAddInd}
            disabled={isLoading || values.inInput === undefined || !values.stringInput}
            isLoader={isLoading && activeBtn === btnNames.addByIdx}
            extraClass={styles.btn_size_m}
          />
          <Button
            text="удалить по индексу"
            type="button"
            onClick={handleRemoveInd}
            disabled={isLoading || values.inInput === undefined} // или пустой список или нет такого индекса
            isLoader={isLoading && activeBtn === btnNames.removeByIdx}
            extraClass={styles.btn_size_m}
          />
        </div>
      </div>
      <ul className={styles.list}>
        {arr?.map((item, index) => {
          return (
            <>
              <li key={index}>
                <Circle
                  letter={item.value}
                  index={index}
                  state={item.color}
                  // head={index === stack.size() - 1 ? "top" : ""}
                />
              </li>
              {index !== arr.length - 1 && (
                <img className={styles.shevron} src={shevron} alt="Стрелка вправо" />
              )}
            </>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
