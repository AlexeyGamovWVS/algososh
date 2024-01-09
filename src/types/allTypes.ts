import { ElementStates } from "./element-states";

// string
export type TCircle = {
  value: string;
  color: ElementStates;
};

export type TColumnItem = {
  value: number;
  color: ElementStates;
};

export enum btnNames {
  add = 'add',
  remove = 'rmv',
  clear = 'clr',
	addInHead = "addInHead",
	addInTail = "addInTail",
	removeHead = "rmHead",
	removeTail = "rmTail",
	addByIdx = "addByIdx",
	removeByIdx = "removeByIdx"
}