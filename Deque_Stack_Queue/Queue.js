import { BucketedDeque } from "./DEQUE.js";

class Queue {
  #data;
  #size;

  constructor() {
    this.#data = new BucketedDeque();
    this.#size = 0;
  }

  isEmpty() {
    return this.#size === 0;
  }

  
  size() {
    return this.#size;
  }

  enqueue(value) {
    this.#data.push_back(value);
    ++this.#size;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("The queue is empty");
    }
    --this.#size;
    return this.#data.pop_front();
  }

  front() {
    if (this.isEmpty()) {
      throw new Error("The queue is empty");
    }
    return this.#data.front();
  }

  back() {
    if (this.isEmpty()) {
      throw new Error("The queue is empty");
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

const q = new Queue();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

console.log(q.toArray());

console.log(q.dequeue());
console.log(q.dequeue());

console.log(q.front());
console.log(q.back());

console.log(q.size());

q.dequeue();
console.log(q.isEmpty());

try {
  q.dequeue();
} catch (e) {
  console.log(e.message);
}

q.enqueue(7);
q.enqueue(8);
q.enqueue(9);

for (const x of q) {
  console.log(x);
}
