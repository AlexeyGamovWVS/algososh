import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import styles from "./list.module.css";
import { TCircle, btnNames } from "../../types/allTypes";
import { Circle } from "../ui/circle/circle";
import shevron from "../../images/icons/shevron-r.svg";
import { delay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "./list";
import { ElementStates } from "../../types/element-states";

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ stringInput: "", inInput: "" });
  const [isLoading, setLoading] = useState(false);
  const [arr, setArr] = useState<TCircle[]>([]);
  const [activeBtn, setActiveBtn] = useState<btnNames | null>(null);
  const [list] = useState(new LinkedList<TCircle>());

  useEffect(() => {
    list.setRandList();
    setArr([...list.elements()]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddHead = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.addInHead);
    setLoading(true);

    list.prepend({ value: values.stringInput!, color: ElementStates.Default });

    setValues({ stringInput: "" });
    await delay(DELAY_IN_MS);
    // color
    setArr([...list.elements()]);

    setLoading(false);
    setActiveBtn(null);
  };

  const handleAddTail = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.addInTail);
    setLoading(true);

    list.append({ value: values.stringInput!, color: ElementStates.Default });

    setValues({ stringInput: "" });
    await delay(DELAY_IN_MS);
    // color
    setArr([...list.elements()]);

    setLoading(false);
    setActiveBtn(null);
  };

  const handleRemoveHead = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.removeHead);
    setLoading(true);

    list.deleteHead();

    setValues({ stringInput: "" });
    await delay(DELAY_IN_MS);
    // color
    setArr([...list.elements()]);
    setLoading(false);

    setActiveBtn(null);
  };

  const handleRemoveTail = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.removeTail);
    setLoading(true);

    list.deleteTail();

    setValues({ stringInput: "" });
    await delay(DELAY_IN_MS);
    // color
    setArr([...list.elements()]);

    setLoading(false);
    setActiveBtn(null);
  };

  const handleAddInd = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.addByIdx);
    setLoading(true);

    list.addByIndex({ value: values.stringInput!, color: ElementStates.Modified }, Number(values.inInput!));

    setValues({ stringInput: "", inInput: "" });
    await delay(DELAY_IN_MS);
    // color
    setArr([...list.elements()]);

    setLoading(false);
    setActiveBtn(null);
  };

  const handleRemoveInd = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.removeByIdx);
    setLoading(true);
    // remove
    list.deleteByIndex(Number(values.inInput!));

    setValues({ stringInput: "", inInput: "" });
    await delay(DELAY_IN_MS);
    // color
    setArr([...list.elements()]);

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
            disabled={isLoading || !list.head} 
            isLoader={isLoading && activeBtn === btnNames.removeHead}
            extraClass={styles.btn_size_s}
          />
          <Button
            text="Удалить из Tail"
            type="button"
            onClick={handleRemoveTail}
            disabled={isLoading || !list.head}
            isLoader={isLoading && activeBtn === btnNames.removeTail}
            extraClass={styles.btn_size_s}
          />
        </div>
        <div className={styles.listMenu__row}>
          <Input
            name="inInput"
            placeholder="Введите индекс"
            type="text"
            isLimitText={false}
            onChange={handleChange}
            value={values.inInput}
            disabled={isLoading || !list.head}
            extraClass={styles.input}
          />
          <Button
            text="Добавить по индексу"
            type="button"
            onClick={handleAddInd}
            disabled={isLoading || !values.inInput || !values.stringInput}
            isLoader={isLoading && activeBtn === btnNames.addByIdx}
            extraClass={styles.btn_size_m}
          />
          <Button
            text="удалить по индексу"
            type="button"
            onClick={handleRemoveInd}
            disabled={isLoading || !values.inInput || !list.head}
            isLoader={isLoading && activeBtn === btnNames.removeByIdx}
            extraClass={styles.btn_size_m}
          />
        </div>
      </div>
      <ul className={styles.list}>
        {arr?.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <li>
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
            </React.Fragment>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
