interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  clear: () => void;

  isEmpty: () => boolean;
  elements: () => (T | null)[];
}

export class Queue<T> implements IQueue<T> {
  private container: T[] = [];
  head: number = 0;
  tail: number = 0;
  private length: number = 0;
  private readonly size: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Maximum length exceeded');
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    delete this.container[this.head % this.size];
    this.head++;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    return this.container[this.head % this.size];
  };

  elements = () => this.container;

  clear = () => {
    // намеренно не делал проверку на пустую очередь, чтобы всегда была возможность сбросить без перезагрузки страницы
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };
  isEmpty = () => this.length === 0;
}