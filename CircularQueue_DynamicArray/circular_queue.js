import { DynamicArray } from "./DynamicArray.js";

export class CircularQueue {
  #data;
  #front;
  #size;
  #capacity;

  constructor(capacity = 8) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Capacity must be a positive integer");
    }

    this.#capacity = capacity;
    this.#data = new DynamicArray();

    for (let i = 0; i < capacity; i++) {
      this.#data.pushBack(0);
    }

    this.#front = 0;
    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  capacity() {
    return this.#capacity;
  }

  isEmpty() {
    return this.#size === 0;
  }

  clear() {
    for (let i = 0; i < this.#capacity; i++) {
      this.#data.set(i, 0);
    }
    this.#front = 0;
    this.#size = 0;
  }

  enqueue(value) {
    if (!Number.isInteger(value)) {
      throw new Error("Value must be integer");
    }

    if (this.#size === this.#capacity) {
      this.#grow();
    }

    const rear = (this.#front + this.#size) % this.#capacity;
    this.#data.set(rear, value);
    this.#size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    const value = this.#data.at(this.#front);
    this.#data.set(this.#front, 0);

    this.#front = (this.#front + 1) % this.#capacity;
    this.#size--;

    return value;
  }

  front() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.#data.at(this.#front);
  }

  back() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    const rear = (this.#front + this.#size - 1) % this.#capacity;
    return this.#data.at(rear);
  }

  #grow() {
    const newCapacity = this.#capacity * 2;
    const newData = new DynamicArray();

    for (let i = 0; i < newCapacity; i++) {
      newData.pushBack(0);
    }

    for (let i = 0; i < this.#size; i++) {
      const value = this.#data.at((this.#front + i) % this.#capacity);
      newData.set(i, value);
    }

    this.#data = newData;
    this.#capacity = newCapacity;
    this.#front = 0;
  }

  toArray() {
    const res = [];

    for (let i = 0; i < this.#size; i++) {
      res.push(this.#data.at((this.#front + i) % this.#capacity));
    }

    return res;
  }

  [Symbol.iterator]() {
    let i = 0;

    return {
      next: () => {
        if (i < this.#size) {
          return {
            value: this.#data.at((this.#front + i++) % this.#capacity),
            done: false,
          };
        }
        return { done: true };
      },
    };
  }
}
