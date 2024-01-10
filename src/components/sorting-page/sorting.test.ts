import { TColumnItem } from '../../types/allTypes';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { bubbleSort, selectSort } from './sorting';

function arrayToString(arr: TColumnItem[]) {
  return arr.map((obj) => JSON.stringify(obj)).join(' ');
}

describe('Тестирование алгоритмов сортировки выбором и пузырьком', () => {
  const emtyArr: TColumnItem[] = [];

  const oneElArr: TColumnItem[] = [{ value: 10, color: ElementStates.Default }];
  const sortedOneElArr: TColumnItem[] = [{ value: 10, color: ElementStates.Modified }];

  const fullArr: TColumnItem[] = [
    { value: 10, color: ElementStates.Default },
    { value: 15, color: ElementStates.Default },
    { value: 1, color: ElementStates.Default },
    { value: 17, color: ElementStates.Default },
  ];

  const sortedFullArrAsc = [
    { value: 1, color: ElementStates.Modified },
    { value: 10, color: ElementStates.Modified },
    { value: 15, color: ElementStates.Modified },
    { value: 17, color: ElementStates.Modified },
  ];

  const sortedFullArrDesc = [
    { value: 17, color: ElementStates.Modified },
    { value: 15, color: ElementStates.Modified },
    { value: 10, color: ElementStates.Modified },
    { value: 1, color: ElementStates.Modified },
  ];

  it('Сортировка выбором пустого массива по возрастанию', () => {
    expect(arrayToString(selectSort(emtyArr, Direction.Ascending))).toBe([].toString());
  });

  it('Сортировка выбором пустого массива по убыванию', () => {
    expect(arrayToString(selectSort(emtyArr, Direction.Descending))).toBe([].toString());
  });

  it('Сортировка выбором массива c 1 элементом по возрастанию', () => {
    expect(arrayToString(selectSort(oneElArr, Direction.Ascending))).toBe(
      arrayToString(sortedOneElArr)
    );
  });

  it('Сортировка выбором массива c 1 элементом по убыванию', () => {
    expect(arrayToString(selectSort(oneElArr, Direction.Descending))).toBe(
      arrayToString(sortedOneElArr)
    );
  });

  it('Сортировка выбором массива c несколькими элементами по возрастанию', () => {
    expect(arrayToString(selectSort(fullArr, Direction.Ascending))).toBe(
      arrayToString(sortedFullArrAsc)
    );
  });

  it('Сортировка выбором массива c несколькими элементами по убыванию', () => {
    expect(arrayToString(selectSort(fullArr, Direction.Descending))).toBe(
      arrayToString(sortedFullArrDesc)
    );
  });

  //////

  it('Сортировка пузырьком пустого массива по возрастанию', () => {
    expect(arrayToString(bubbleSort(emtyArr, Direction.Ascending))).toBe([].toString());
  });

  it('Сортировка пузырьком пустого массива по убыванию', () => {
    expect(arrayToString(bubbleSort(emtyArr, Direction.Descending))).toBe([].toString());
  });

  it('Сортировка пузырьком массива c 1 элементом по возрастанию', () => {
    expect(arrayToString(bubbleSort(oneElArr, Direction.Ascending))).toBe(
      arrayToString(sortedOneElArr)
    );
  });

  it('Сортировка пузырьком массива c 1 элементом по убыванию', () => {
    expect(arrayToString(bubbleSort(oneElArr, Direction.Descending))).toBe(
      arrayToString(sortedOneElArr)
    );
  });

  it('Сортировка пузырьком массива c несколькими элементами по возрастанию', () => {
    expect(arrayToString(bubbleSort(fullArr, Direction.Ascending))).toBe(
      arrayToString(sortedFullArrAsc)
    );
  });

  it('Сортировка пузырьком массива c несколькими элементами по убыванию', () => {
    expect(arrayToString(bubbleSort(fullArr, Direction.Descending))).toBe(
      arrayToString(sortedFullArrDesc)
    );
  });
});
