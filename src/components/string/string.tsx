import React, { useEffect, useRef, useState } from 'react';
import styles from './string.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { useForm } from '../../hooks/useForm';
// import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { getLetterState, getReverseStringsOnEachStep } from './utils';

// const getStringArr = (string: string) => {
//   return string.split('').map((letter) => {
//     return {
//       value: letter,
//       color: ElementStates.Default,
//     };
//   });
// };

export const StringComponent: React.FC = () => {
  const { values, handleChange } = useForm({ stringInput: '' });
  const [isLoading, setLoading] = useState(false);
  // const [stringArr, setStringArr] = useState<TCircle[]>([]);
  // New
  const [allSteps, setAllSteps] = useState<Array<string[]>>([]);
  const [currStepNum, setCurrStepNum] = useState(0);
  const intervalId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // await reverseString(values.stringInput!);
    reverseString(values.stringInput!);
  };

  const reverseString = (string: string) => {
    // новое решение
    const steps = getReverseStringsOnEachStep(string);
    setAllSteps(steps);
    setCurrStepNum(0);

    if (steps.length && string.length > 1) {
      intervalId.current = setInterval(() => {
        setCurrStepNum((currStep) => {
          const nextStepNum = currStep + 1;
          if (nextStepNum >= steps.length - 1 && intervalId.current) {
            setLoading(false);
            clearInterval(intervalId.current);
          }
          return nextStepNum;
        });
      }, 3000);
    } else {
      setLoading(false);
    }

    // старое решение
    // const simbolsArr = getStringArr(string);
    // setStringArr(simbolsArr);
    // let start = 0;
    // let end = simbolsArr.length - 1;
    // while (start < end) {
    //   simbolsArr[start].color = ElementStates.Changing;
    //   simbolsArr[end].color = ElementStates.Changing;

    //   await delay(DELAY_IN_MS);
    //   swap(simbolsArr, start, end);

    //   simbolsArr[start].color = ElementStates.Modified;
    //   simbolsArr[end].color = ElementStates.Modified;

    //   start++;
    //   end--;

    //   simbolsArr[start].color = ElementStates.Changing;
    //   simbolsArr[end].color = ElementStates.Changing;
    //   setStringArr([...simbolsArr]);
    // }

    // simbolsArr[start].color = ElementStates.Modified;
    // simbolsArr[end].color = ElementStates.Modified;
    // setStringArr([...simbolsArr]);
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
          disabled={!values.stringInput || values.stringInput.length > 11}
          isLoader={isLoading}
        />
      </form>
      <ul className={styles.circles}>
        {allSteps[currStepNum]?.map((simbol, index) => {
          return (
            <li key={index}>
              <Circle
                letter={simbol}
                state={getLetterState(index, currStepNum, allSteps[currStepNum].length)}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
