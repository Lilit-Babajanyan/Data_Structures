import { BucketedDeque } from "./DEQUE.js";

class Stack {
  #data;
  #size;

  constructor(initialCapacity) {
    let bucketSize = 8;

    if (Number.isInteger(initialCapacity) && initialCapacity > 8) {
      bucketSize = initialCapacity;
    }

    this.#data = new BucketedDeque(bucketSize);
    this.#size = 0;
  }

  isEmpty() {
    return this.#size === 0;
  }

  size() {
    return this.#size;
  }

  push(value) {
    this.#data.push_back(value);
    this.#size += 1;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }

    this.#size -= 1;

    return this.#data.pop_back();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.#data.back();
  }

  clear() {
    this.#data.clear();
    this.#size = 0;
  }

  toArray() {
    return this.#data.toArray();
  }

  [Symbol.iterator]() {
    return this.#data[Symbol.iterator]();
  }
}

const s = new Stack();

s.push(1);
s.push(2);
s.push(3);

console.log(s.toArray());

console.log(s.pop());
console.log(s.pop());

console.log(s.peek());
console.log(s.size());

s.pop();
console.log(s.isEmpty());

try {
  s.pop();
} catch (e) {
  console.log(e.message);
}

s.push(10);
s.push(20);
s.push(30);

for (const x of s) {
  console.log(x);
}
