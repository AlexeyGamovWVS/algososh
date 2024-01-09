import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useForm } from "../../hooks/useForm";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci.module.css";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const { values, handleChange } = useForm({ fiboInput: 0 });
  const [isLoading, setLoading] = useState(false);
  const [numbers, setNumbersArr] = useState<number[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fibArr = getFiboNumbers(values.fiboInput || 0);
    await getNumbersArr(fibArr);
    setLoading(false);
  };

  const getNumbersArr = async (fibArr: number[]) => {
    for (let i = 0; i < fibArr!.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setNumbersArr(fibArr.slice(0, i + 1));
    }
  };

  const getFiboNumbers = (n: number) => {
    // X[n] = X[n–1] + X[n–2], n > 2
    let fibArr = [0, 1];
    if (n > 1) {
      for (let i = 2; i < n; i++) {
        fibArr[i] = fibArr[i - 1] + fibArr[i - 2];
      }
    }
    return fibArr;
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="fiboInput"
          placeholder="Введите номер последнего члена"
          type="number"
          max={19}
          onChange={handleChange}
          value={values.fiboInput}
          disabled={isLoading}
          isLimitText={true}
        />
        <Button type="submit" text="Рассчитать" disabled={!values.fiboInput || values.fiboInput > 19} isLoader={isLoading} />
      </form>
      <ul className={styles.circles}>
        {numbers?.map((simbol, index) => {
          return (
            <li key={index}>
              <Circle letter={`${simbol}`} index={index} />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
