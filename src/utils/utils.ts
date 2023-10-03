import { TCircle } from "../types/allTypes";

export const delay = (milliseconds: number) => {
  return new Promise<NodeJS.Timeout>((resolve) => setTimeout(resolve, milliseconds));
};

export const swap = (arr: TCircle[], firstIndex: number, secondIndex: number) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  return arr;
}
