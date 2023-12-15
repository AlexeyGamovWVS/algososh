import { getRandomArr } from "../../utils/utils";

export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  addByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  setRandList: (minCountElements: number, maxCountElements: number, maxVal: number) => void;
  elements: () => T[];
  getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
  head: LinkedListNode<T> | null | undefined;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  setRandList(minCountElements: number = 3, maxCountElements: number = 4, maxVal: number = 100) {
    const rArr = getRandomArr(minCountElements, maxCountElements, maxVal);
    rArr.forEach((item) => this.append(item));
  }

  append(element: T) {
    const node = new LinkedListNode(element);
    if (!this.head) {
      this.head = node;
    } else {
      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new LinkedListNode(element);
    if (!this.head) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error("Put down correct index");
    } else {
      switch (index) {
        case 0:
          this.prepend(element);
          break;
        case this.size - 1:
          this.append(element);
          break;
        default:
          const node = new LinkedListNode(element);
          let curr = this.head;
          let currIndex = 0;
          while (curr && currIndex < index - 1) {
            curr = curr.next;
            currIndex++;
          }
          if (curr) {
            node.next = curr.next;
            curr.next = node;
          }
          this.size++;
          break;
      }
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      throw new Error("Put down correct index");
    } else {
      let curr = this.head;
      switch (index) {
        case 0:
          this.deleteHead();
          break;
        case this.size - 1:
          this.deleteTail();
          break;
        default:
          let prev = null;
          let currIndex = 0;
          while (currIndex < index) {
            prev = curr;
            curr = curr?.next;
            currIndex++;
          }
          prev!.next = curr!.next;
          this.size--;
          break;
      }
    }
  }

  deleteHead() {
    if (!this.head) {
      throw new Error("List is Empty");
    } else {
      let curr = this.head;
      this.head = curr.next;
      this.size--;
    }
  }

  deleteTail() {
    if (!this.head || !this.head.next) {
      this.head = null;
      this.size = 0;
    } else {
      let curr = this.head;
      while (curr.next && curr.next.next) {
        curr = curr.next;
      }
      curr.next = null;
      this.size--;
    }
  }

  elements() {
    let curr = this.head;
    let arr = [];
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }

  getSize = () => this.size;
}

// const list = new LinkedList<number>();
// list.append(12);
// list.append(13);
// list.append(14);
// list.print(); // 12 13 14
