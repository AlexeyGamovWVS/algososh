import { ElementStates } from '../../types/element-states';
import { swap } from '../../utils/utils';

export function getReverseStringsOnEachStep(string: string) {
  let array: Array<string[]> = [];
  const simbolsArr = string.split('');
  array[0] = [...simbolsArr];  
  if (string.length <= 1) return array;
  let start = 0;
  let end = simbolsArr.length - 1;
  while (start < end) {
    swap(simbolsArr, start, end);
    array.push([...simbolsArr]);
    start++;
    end--;
  }
  return array;
}

export function getLetterState(index: number, currStep: number, length: number): ElementStates {
  if (
    index < currStep ||
    length - index - 1 < currStep ||
    length === 1 ||
    currStep === Math.floor(length / 2)
  ) {
    return ElementStates.Modified;
  }

  if (currStep === index || currStep === length - index - 1) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
}
