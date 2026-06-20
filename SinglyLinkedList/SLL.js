class Node {
  #value;
  #next;

  constructor(value, next = null) {
    this.#value = value;
    this.#next = next;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  get next() {
    return this.#next;
  }

  set next(next) {
    this.#next = next;
  }
}

class SinglyLinkedList {
  #head;

  constructor(value) {
    if (value !== undefined) {
      this.#head = new Node(value);
    } else {
      this.#head = null;
    }
  }

  [Symbol.iterator]() {
    let curr = this.#head;

    return {
      next() {
        if (curr === null) {
          return { done: true };
        }

        const value = curr.value;
        curr = curr.next;

        return {
          value,
          done: false,
        };
      },
    };
  }

  *entries() {
    let curr = this.#head;
    let index = 0;

    while (curr !== null) {
      yield [index, curr.value];
      curr = curr.next;
      index++;
    }
  }

  empty() {
    return this.#head === null;
  }

  size() {
    let count = 0;
    let curr = this.#head;

    while (curr !== null) {
      count++;
      curr = curr.next;
    }

    return count;
  }

  clear() {
    this.#head = null;
  }

  front() {
    if (this.empty()) {
      throw new Error("The list is empty");
    }

    return this.#head.value;
  }

  back() {
    if (this.empty()) {
      throw new Error("The list is empty");
    }

    let curr = this.#head;

    while (curr.next !== null) {
      curr = curr.next;
    }

    return curr.value;
  }

  at(index) {
    if (!Number.isInteger(index) || index < 0) {
      throw new Error("Invalid index");
    }

    let curr = this.#head;
    let currIndex = 0;

    while (curr !== null) {
      if (currIndex === index) {
        return curr.value;
      }

      curr = curr.next;
      currIndex++;
    }

    throw new Error("Invalid index");
  }

  pushFront(value) {
    this.#head = new Node(value, this.#head);
  }

  pushBack(value) {
    const newNode = new Node(value);

    if (this.#head === null) {
      this.#head = newNode;
      return;
    }

    let curr = this.#head;

    while (curr.next !== null) {
      curr = curr.next;
    }

    curr.next = newNode;
  }

  popFront() {
    if (this.empty()) {
      throw new Error("The list is empty");
    }

    const value = this.#head.value;
    this.#head = this.#head.next;

    return value;
  }

  popBack() {
    if (this.empty()) {
      throw new Error("The list is empty");
    }

    if (this.#head.next === null) {
      const value = this.#head.value;
      this.#head = null;
      return value;
    }

    let curr = this.#head;

    while (curr.next.next !== null) {
      curr = curr.next;
    }

    const value = curr.next.value;
    curr.next = null;

    return value;
  }

  insert(index, value) {
    if (!Number.isInteger(index) || index < 0) {
      throw new Error("Invalid index");
    }

    if (index === 0) {
      this.pushFront(value);
      return;
    }

    let curr = this.#head;

    for (let i = 0; i < index - 1; i++) {
      if (curr === null) {
        throw new Error("Invalid index");
      }

      curr = curr.next;
    }

    if (curr === null) {
      throw new Error("Invalid index");
    }

    const newNode = new Node(value);

    newNode.next = curr.next;
    curr.next = newNode;
  }

  erase(index) {
    if (!Number.isInteger(index) || index < 0) {
      throw new Error("Invalid index");
    }

    if (this.#head === null) {
      throw new Error("Invalid index");
    }

    if (index === 0) {
      return this.popFront();
    }

    let curr = this.#head;

    for (let i = 0; i < index - 1; i++) {
      if (curr.next === null) {
        throw new Error("Invalid index");
      }

      curr = curr.next;
    }

    if (curr.next === null) {
      throw new Error("Invalid index");
    }

    const value = curr.next.value;
    curr.next = curr.next.next;

    return value;
  }

  find(value) {
    let curr = this.#head;
    let index = 0;

    while (curr !== null) {
      if (curr.value === value) {
        return index;
      }

      curr = curr.next;
      index++;
    }

    return -1;
  }

  contains(value) {
    return this.find(value) !== -1;
  }

  toArray() {
    const arr = [];
    let curr = this.#head;

    while (curr !== null) {
      arr.push(curr.value);
      curr = curr.next;
    }

    return arr;
  }

  reverse() {
    let prev = null;
    let curr = this.#head;

    while (curr !== null) {
      const next = curr.next;

      curr.next = prev;
      prev = curr;
      curr = next;
    }

    this.#head = prev;
  }
}

const list = new SinglyLinkedList();

list.pushBack(10);
list.pushBack(20);
list.pushBack(30);

list.insert(1, 15);

console.log(list.toArray());

list.erase(2);

console.log(list.toArray());

list.reverse();

console.log(list.toArray());
