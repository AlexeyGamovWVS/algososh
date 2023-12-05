import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting.module.css";
import { Direction } from "../../types/direction";
import { TColumnItem } from "../../types/allTypes";
import { Column } from "../ui/column/column";
import { delay, getRandomArr, swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [sortType, setSortType] = useState("select");
  const [direction, setDirection] = useState<Direction | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);
  const [arr, setArr] = useState<TColumnItem[]>([]);

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortType(e.target.value);
  };

  const hadleChangeDirection = (dir: Direction) => {
    setDirection(dir);
    arr.forEach((item) => (item.color = ElementStates.Default));
    // selectSort(arr, dir);
    bubbleSort(arr, dir);
  };

  const handleNewArr = (e: React.MouseEvent) => {
    e.preventDefault();
    setArr(getRandomArr());
  };
  // 1st random array onMount
  useEffect(() => {
    setArr(getRandomArr());
  }, []);

  const selectSort = async (arr: TColumnItem[], dir: Direction) => {
    setLoading(true);
    for (let i = 0; i < arr.length; i++) {
      let minInd = i;
      // ищем индекс мин / max элемента
      for (let j = i; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        switch (dir) {
          case Direction.Ascending:
            if (arr[j].value < arr[minInd].value) {
              minInd = j;
            }
            break;
          case Direction.Descending:
            if (arr[j].value > arr[minInd].value) {
              minInd = j;
            }
            break;
          default:
            minInd = i;
            break;
        }
        arr[j].color = ElementStates.Default;
        arr[i].color = ElementStates.Default;
        setArr([...arr]);
      }
      minInd !== i && swap(arr, i, minInd);
      arr[i].color = ElementStates.Modified;
      setArr([...arr]);
    }
    setLoading(false);
    setDirection(undefined);
  };

  const bubbleSort = async (arr: TColumnItem[], dir: Direction) => {
    setLoading(true);
    for (let i = arr.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        arr[j + 1].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        switch (dir) {
          case Direction.Ascending:
            if (arr[j].value > arr[j + 1].value) {
              swap(arr, j, j + 1);
            }
            break;
          case Direction.Descending:
            if (arr[j].value < arr[j + 1].value) {
              swap(arr, j, j + 1);
            }
            break;
          default:
            break;
        }
        arr[j].color = ElementStates.Default;
        arr[i].color = ElementStates.Default;
        setArr([...arr]);
      }
      arr[i].color = ElementStates.Modified;
      setArr([...arr]);
    }
    await delay(SHORT_DELAY_IN_MS);
    arr[0].color = ElementStates.Modified;
    setLoading(false);
    setDirection(undefined);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.sortingMenu}>
        <div className={styles.radios}>
          <RadioInput
            label="Выбор"
            name=""
            value={"select"}
            onChange={handleChangeRadio}
            checked={sortType === "select"}
            disabled={isLoading}
          />
          <RadioInput
            label="Пузырьком"
            value="bubble"
            onChange={handleChangeRadio}
            checked={sortType === "bubble"}
            disabled={isLoading}
          />
        </div>
        <div className={styles.sortbuttons}>
          <Button
            text="По возрастанию"
            onClick={() => hadleChangeDirection(Direction.Ascending)}
            sorting={Direction.Ascending}
            isLoader={isLoading && direction === Direction.Ascending}
            disabled={isLoading}
          />
          <Button
            text="По убыванию"
            onClick={() => hadleChangeDirection(Direction.Descending)}
            sorting={Direction.Descending}
            isLoader={isLoading && direction === Direction.Descending}
            disabled={isLoading}
          />
        </div>
        <Button
          text="Новый массив"
          onClick={handleNewArr}
          disabled={isLoading}
          extraClass={styles.newArrButton}
        />
      </div>

      <ul className={styles.diagram}>
        {arr?.map((item, index) => {
          return (
            <li key={index}>
              <Column index={item?.value} state={item?.color} />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
