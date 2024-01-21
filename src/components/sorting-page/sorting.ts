import { TColumnItem } from '../../types/allTypes';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { swap } from '../../utils/utils';

export const selectSort = (arr: TColumnItem[], dir: Direction) => {
  for (let i = 0; i < arr.length; i++) {
    let minInd = i;
    for (let j = i; j < arr.length; j++) {
      arr[i].color = ElementStates.Changing;
      arr[j].color = ElementStates.Changing;
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
    }
    minInd !== i && swap(arr, i, minInd);
    arr[i].color = ElementStates.Modified;
  }
  return arr;
};

export const bubbleSort = (arr: TColumnItem[], dir: Direction) => {
  if (arr.length < 1) {
    return arr
  }
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      arr[j + 1].color = ElementStates.Changing;
      arr[j].color = ElementStates.Changing;
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
    }
    arr[i].color = ElementStates.Modified;
  }
  arr[0].color = ElementStates.Modified;
  return arr;
};
