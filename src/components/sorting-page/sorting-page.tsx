import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting.module.css";
import { Direction } from "../../types/direction";
import { TColumnItem } from "../../types/allTypes";
import { Column } from "../ui/column/column";
import { getRandomArr } from "../../utils/utils";

export const SortingPage: React.FC = () => {
  const [sortType, setSortType] = useState("select");
  const [direction, setDirection] = useState<Direction | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);
  const [arr, setArr] = useState<Array<TColumnItem>>([]);

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortType(e.target.value);
  };

  const hadleChangeDirection = (dir: Direction) => {
    setDirection(dir);
  };

  const handleNewArr = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  // 1st random array onMount
  useEffect(() => {
    setArr(getRandomArr());
  }, []);

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
