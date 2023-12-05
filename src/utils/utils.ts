import { TCircle, TColumnItem } from "../types/allTypes";
import { ElementStates } from "../types/element-states";

export const delay = (milliseconds: number) => {
  return new Promise<NodeJS.Timeout>((resolve) => setTimeout(resolve, milliseconds));
};

export const swap = (arr: TCircle[], firstIndex: number, secondIndex: number) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  return arr;
};

export const getRandomArr = (minLen: number = 3, maxLen: number = 17, maxValue: number = 100) => {
  const arr: TColumnItem[] = [];
  const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  for (let i = 0; i < length; i++) {
    arr.push({ value: Math.floor(Math.random() * maxValue), color: ElementStates.Default });
  }
  return arr;
};
