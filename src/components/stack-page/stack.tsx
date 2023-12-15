interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  isEmpty: () => boolean;
  size: () => number;
  elements: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => (this.size() > 0 ? this.container[this.size() - 1] : null);

  clear = () => {
    this.container = [];
  };

  size = () => this.container.length;
  elements = () => this.container;
  isEmpty = () => (this.size() > 0 ? false : true);
}
