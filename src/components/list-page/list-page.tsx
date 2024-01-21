import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { useForm } from '../../hooks/useForm';
import styles from './list.module.css';
import { TCircle, btnNames } from '../../types/allTypes';
import { Circle } from '../ui/circle/circle';
import shevron from '../../images/icons/shevron-r.svg';
import { delay } from '../../utils/utils';
import { DELAY_IN_MS } from '../../constants/delays';
import { LinkedList } from './list';
import { ElementStates } from '../../types/element-states';

interface ListItem extends TCircle {
  up?: boolean;
  down?: boolean;
  temp?: string;
}

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ stringInput: '', inInput: '' });
  const [isLoading, setLoading] = useState(false);
  const [arr, setArr] = useState<ListItem[]>([]);
  const [activeBtn, setActiveBtn] = useState<btnNames | null>(null);
  const [list] = useState(new LinkedList<ListItem>());

  useEffect(() => {
    list.setRandList();
    setArr([...list.elements()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddHead = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.addInHead);
    setLoading(true);

    let newArr = [...arr];
    //kruzok
    newArr[0].up = true;
    newArr[0].temp = values.stringInput;
    setArr(newArr);
    await delay(DELAY_IN_MS);

    //sbros kruzka
    newArr[0].up = false;
    newArr[0].temp = '';
    setArr(newArr);
    list.prepend({ value: values.stringInput!, color: ElementStates.Default });

    //pereopredelenie list
    newArr = [...list.elements()];
    newArr[0].color = ElementStates.Modified;
    setArr(newArr);
    await delay(DELAY_IN_MS);

    newArr[0].color = ElementStates.Default;
    setArr(newArr);
    setValues({ ...values, stringInput: '' });
    setLoading(false);
    setActiveBtn(null);
  };

  const handleAddTail = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.addInTail);
    setLoading(true);

    let newArr = [...arr];
    //kruzok
    newArr[list.getSize() - 1].up = true;
    newArr[list.getSize() - 1].temp = values.stringInput;
    setArr(newArr);
    await delay(DELAY_IN_MS);

    //sbros kruzka
    newArr[list.getSize() - 1].up = false;
    newArr[list.getSize() - 1].temp = '';
    setArr(newArr);

    list.append({ value: values.stringInput!, color: ElementStates.Default });

    //pereopredelenie list
    newArr = [...list.elements()];
    newArr[list.getSize() - 1].color = ElementStates.Modified;
    setArr(newArr);
    await delay(DELAY_IN_MS);

    newArr[list.getSize() - 1].color = ElementStates.Default;
    setArr(newArr);
    setValues({ ...values, stringInput: '' });
    setLoading(false);
    setActiveBtn(null);
  };

  const handleRemoveHead = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.removeHead);
    setLoading(true);

    let newArr = [...arr];
    //kruzok
    newArr[0].temp = newArr[0].value;
    newArr[0].value = '';
    newArr[0].down = true;
    setArr(newArr);
    await delay(DELAY_IN_MS);

    list.deleteHead();

    setValues({ ...values, stringInput: '' });
    setArr([...list.elements()]);
    setLoading(false);
    setActiveBtn(null);
  };

  const handleRemoveTail = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.removeTail);
    setLoading(true);
    let newArr = [...arr];
    //kruzok
    newArr[list.getSize() - 1].temp = newArr[list.getSize() - 1].value;
    newArr[list.getSize() - 1].value = '';
    newArr[list.getSize() - 1].down = true;
    setArr(newArr);
    await delay(DELAY_IN_MS);

    list.deleteTail();

    setValues({ ...values, stringInput: '' });
    // color
    setArr([...list.elements()]);
    setLoading(false);
    setActiveBtn(null);
  };

  const handleAddInd = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.addByIdx);
    setLoading(true);
    let newArr = [...arr];

    for (let i = 0; i <= Number(values.inInput!); i++) {
      if (i - 1 >= 0) {
        newArr[i - 1].temp = '';
        newArr[i - 1].up = false;
      }
      newArr[i].temp = values.stringInput!;
      newArr[i].up = true;
      if (i !== Number(values.inInput!)) {
        newArr[i].color = ElementStates.Changing;
      }
      setArr([...newArr]);
      await delay(DELAY_IN_MS);
    }

    list.addByIndex(
      { value: values.stringInput!, color: ElementStates.Modified },
      Number(values.inInput!)
    );

    newArr = [...list.elements()];
    newArr.forEach((item) => {
      item.color = ElementStates.Default;
      item.up = false;
      item.temp = '';
    });

    newArr[Number(values.inInput!)].color = ElementStates.Modified;
    setArr(newArr);
    await delay(DELAY_IN_MS);

    newArr[Number(values.inInput!)].color = ElementStates.Default;
    setArr(newArr);

    setValues({ stringInput: '', inInput: '' });
    setLoading(false);
    setActiveBtn(null);
  };

  const handleRemoveInd = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setActiveBtn(btnNames.removeByIdx);
    setLoading(true);

    let newArr = [...arr];

    for (let i = 0; i <= Number(values.inInput!); i++) {
      newArr[i].color = ElementStates.Changing;

      if (i === Number(values.inInput!)) {
        newArr[i].temp = newArr[i].value;
        newArr[i].value = '';
        newArr[i].down = true;
        newArr[i].color = ElementStates.Default;
      }
      setArr([...newArr]);
      await delay(DELAY_IN_MS);
    }

    list.deleteByIndex(Number(values.inInput!));

    newArr = [...list.elements()];
    newArr.forEach((item) => {
      item.color = ElementStates.Default;
      item.down = false;
      item.temp = '';
    });
    setArr(newArr);
    setValues({ stringInput: '', inInput: '' });
    setLoading(false);
    setActiveBtn(null);

    console.log(newArr);
    console.log(list.getSize());
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
            disabled={isLoading || values.stringInput === ''}
            isLoader={isLoading && activeBtn === btnNames.addInHead}
            extraClass={styles.btn_size_s}
          />
          <Button
            text="Добавить в Tail"
            type="button"
            onClick={handleAddTail}
            disabled={isLoading || values.stringInput === ''}
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
            text={
              Number(values.inInput) > arr.length - 1 || Number(values.inInput) < 0
                ? 'Индекс неверный'
                : 'Добавить по индексу'
            }
            type="button"
            onClick={handleAddInd}
            disabled={
              isLoading ||
              !values.inInput ||
              !values.stringInput ||
              Number(values.inInput) > list.getSize() ||
              (!Number(values.inInput) && Number(values.inInput) !== 0) ||
              Number(values.inInput) < 0
            }
            isLoader={isLoading && activeBtn === btnNames.addByIdx}
            extraClass={styles.btn_size_m}
          />
          <Button
            text={
              Number(values.inInput) > arr.length - 1 || Number(values.inInput) < 0
                ? 'Индекс неверный'
                : 'Удалить по индексу'
            }
            type="button"
            onClick={handleRemoveInd}
            disabled={
              isLoading ||
              !values.inInput ||
              !list.head ||
              Number(values.inInput) > arr.length - 1 ||
              (!Number(values.inInput) && Number(values.inInput) !== 0) ||
              Number(values.inInput) < 0
            }
            isLoader={isLoading && activeBtn === btnNames.removeByIdx}
            extraClass={styles.btn_size_m}
          />
        </div>
      </div>
      <ul className={styles.list}>
        {arr?.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <li data-cy="circle">
                <Circle
                  letter={item.value}
                  index={index}
                  state={item.color}
                  head={
                    index === 0 && !item.up ? (
                      'head'
                    ) : item.up ? (
                      <Circle letter={item.temp} isSmall={true} state={ElementStates.Changing} />
                    ) : (
                      ''
                    )
                  }
                  tail={
                    index === arr.length - 1 && !item.down ? (
                      'tail'
                    ) : item.down ? (
                      <Circle letter={item.temp} isSmall={true} state={ElementStates.Changing} />
                    ) : (
                      ''
                    )
                  }
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
