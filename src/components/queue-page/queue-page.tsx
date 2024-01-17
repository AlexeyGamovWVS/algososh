import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue.module.css';
import { useForm } from '../../hooks/useForm';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { TCircle, btnNames } from '../../types/allTypes';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';
import { Queue } from './queue';

export const QueuePage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ stringInput: '' });
  const [isLoading, setLoading] = useState(false);
  const [arr, setArr] = useState<(TCircle | null)[]>([]);
  const [queue] = useState(new Queue<TCircle>(7));
  const [activeBtn, setActiveBtn] = useState<btnNames | null>(null);

  useEffect(() => {
    setArr([...queue.elements()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddItem = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.add);
    setLoading(true);
    queue.enqueue({
      value: values.stringInput!,
      color: ElementStates.Changing,
    });
    setArr([...queue.elements()]);
    setValues({ stringInput: '' });
    await delay(SHORT_DELAY_IN_MS);
    queue.elements()[queue.tail - 1]!.color = ElementStates.Default;
    setLoading(false);
    setActiveBtn(null);
  };

  const handleRemoveItem = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.remove);
    setLoading(true);
    if (!queue.isEmpty()) {
      queue.peak()!.color = ElementStates.Changing;
      await delay(SHORT_DELAY_IN_MS);
      queue.dequeue();
      setArr([...queue.elements()]);
    }
    setLoading(false);
    setActiveBtn(null);
  };

  const handleClearqueue = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.clear);
    setLoading(true);
    queue.clear();
    setValues({ stringInput: '' });
    setArr([...queue.elements()]);
    setLoading(false);
    setActiveBtn(null);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.queueMenu}>
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
          disabled={isLoading || values.stringInput === '' || queue.tail === 7}
          isLoader={isLoading && activeBtn === btnNames.add}
        />
        <Button
          text="Удалить"
          type="button"
          onClick={handleRemoveItem}
          disabled={isLoading || queue.isEmpty()}
          isLoader={isLoading && activeBtn === btnNames.remove}
        />
        <Button
          text="Сбросить"
          type="button"
          onClick={handleClearqueue}
          disabled={isLoading || (queue.isEmpty() && queue.head === 0 && queue.tail === 0)}
          isLoader={isLoading && activeBtn === btnNames.clear}
          extraClass={styles.clearBtn}
        />
      </div>
      <ul className={styles.queueList}>
        {arr?.map((item, index) => {
          return (
            <li key={index}>
              <Circle
                letter={item?.value}
                index={index}
                state={item?.color}
                head={!queue.isEmpty() && index === queue.head ? 'head' : ''}
                tail={!queue.isEmpty() && index === queue.tail - 1 ? 'tail' : ''}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
