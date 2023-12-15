import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack.module.css';
import { useForm } from '../../hooks/useForm';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { TCircle, btnNames } from '../../types/allTypes';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';
import { Stack } from './stack';

export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ stringInput: '' });
  const [isLoading, setLoading] = useState(false);
  const [arr, setArr] = useState<TCircle[]>([]);
  const [stack] = useState(new Stack<TCircle>());
  const [activeBtn, setActiveBtn] = useState<btnNames | null>(null);

  const handleAddItem = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.add);
    setLoading(true);
    stack.push({
      value: values.stringInput!,
      color: ElementStates.Changing,
    });
    setArr([...stack.elements()]);
    setValues({ stringInput: '' });
    await delay(SHORT_DELAY_IN_MS);
    stack.peak()!.color = ElementStates.Default;
    setLoading(false);
    setActiveBtn(null);
  };

  const handleRemoveItem = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.remove);
    setLoading(true);
    if (stack.size() > 0) {
      stack.peak()!.color = ElementStates.Changing;
      await delay(SHORT_DELAY_IN_MS);
      stack.pop();
      setArr([...stack.elements()]);
    }
    setLoading(false);
    setActiveBtn(null);
  };

  const handleClearStack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.clear);
    setLoading(true);
    stack.clear();
    setArr([...stack.elements()]);
    setLoading(false);
    setActiveBtn(null);
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
          disabled={isLoading || values.stringInput === ''}
          isLoader={isLoading && activeBtn === btnNames.add}
        />
        <Button
          text="Удалить"
          type="button"
          onClick={handleRemoveItem}
          disabled={isLoading || stack.isEmpty()}
          isLoader={isLoading && activeBtn === btnNames.remove}
        />
        <Button
          text="Сбросить"
          type="button"
          onClick={handleClearStack}
          disabled={isLoading || stack.isEmpty()}
          isLoader={isLoading && activeBtn === btnNames.clear}
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
                head={index === stack.size() - 1 ? 'top' : ''}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
