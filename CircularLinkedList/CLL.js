class Node {
  #value;
  #next;

  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class CyclicLinkedList {
  #head;

  constructor(value) {
    if (value) {
      const node = new Node(value);
      this.#head = node;
      node.next = node;
    } else {
      this.#head = null;
    }
  }

  empty() {
    return this.#head === null;
  }

  size() {
    if (this.empty()) {
      return 0;
    }

    let count = 1;
    let curr = this.#head.next;

    while (curr !== this.#head) {
      curr = curr.next;
      count++;
    }
    return count;
  }

  clear() {
    this.#head = null;
  }

  front() {
    if (this.empty()) {
      throw new Error("List is empty");
    }

    return this.#head.value;
  }

  back() {
    if (this.empty()) {
      throw new Error("List is empty");
    }

    let curr = this.#head;

    while (curr.next !== this.#head) {
      curr = curr.next;
    }

    return curr.value;
  }

  at(index) {
    if (!Number.isInteger(index) || index < 0) {
      throw new Error("Invalid index");
    }

    if (this.empty()) {
      throw new Error("Invalid index");
    }

    let curr = this.#head;

    for (let i = 0; i < index; i++) {
      curr = curr.next;

      if (curr === this.#head) {
        throw new Error("Invalid index");
      }
    }

    return curr.value;
  }
  pushBack(value) {
    let newNode = new Node(value);

    if (this.empty()) {
      newNode.next = newNode;
      this.#head = newNode;
      return;
    }

    let curr = this.#head;

    while (curr.next !== this.#head) {
      curr = curr.next;
    }

    curr.next = newNode;
    newNode.next = this.#head;
  }

  pushFront(value) {
    const newNode = new Node(value);

    if (this.empty()) {
      newNode.next = newNode;
      this.#head = newNode;
      return;
    }

    let tail = this.#head;

    while (tail.next !== this.#head) {
      tail = tail.next;
    }

    newNode.next = this.#head;
    tail.next = newNode;
    this.#head = newNode;
  }

  popFront() {
    if (this.empty()) {
      throw new Error("List is empty");
    }

    let value = this.#head.value;

    if (this.#head.next === this.#head) {
      this.#head = null;
      return value;
    }

    let tail = this.#head;

    while (tail.next !== this.#head) {
      tail = tail.next;
    }

    tail.next = this.#head.next;
    this.#head = this.#head.next;

    return value;
  }
  popBack() {
    if (this.empty()) {
      throw new Error("List is empty");
    }

    if (this.#head.next === this.#head) {
      let value = this.#head.value;
      this.#head = null;
      return value;
    }

    let curr = this.#head;

    while (curr.next.next !== this.#head) {
      curr = curr.next;
    }

    const value = curr.next.value;
    curr.next = this.#head;

    return value;
  }

  insert(index, value) {
    if (index < 0 || index > this.size()) {
      throw new Error("Invalid index");
    }

    if (index === 0) {
      this.pushFront(value);
      return;
    }

    if (index === this.size()) {
      this.pushBack(value);
      return;
    }

    const node = new Node(value);
    let current = this.#head;

    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }

    node.next = current.next;
    current.next = node;
  }

  erase(index) {
    if (index < 0 || index >= this.size()) {
      throw new Error("Invalid index");
    }

    if (index === 0) {
      return this.popFront();
    }

    let current = this.#head;

    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }

    const removedNode = current.next;
    current.next = removedNode.next;

    return removedNode.value;
  }

  find(value) {
    if (this.empty()) return -1;

    let current = this.#head;
    let index = 0;

    do {
      if (current.value === value) {
        return index;
      }

      current = current.next;
      index++;
    } while (current !== this.#head);

    return -1;
  }

  contains(value) {
    return this.find(value) !== -1;
  }

  toArray() {
    const result = [];

    if (this.empty()) return result;

    let current = this.#head;

    do {
      result.push(current.value);
      current = current.next;
    } while (current !== this.#head);

    return result;
  }

  reverse() {
    if (this.empty() || this.#head.next === this.#head) {
      return;
    }

    let prev = this.#head;
    let curr = this.#head.next;
    let next = null;

    while (curr !== this.#head) {
      next = curr.next;
      curr.next = prev;

      prev = curr;
      curr = next;
    }

    this.#head.next = prev;
    this.#head = prev;
  }

  *[Symbol.iterator]() {
    if (this.empty()) return;

    let current = this.#head;

    do {
      yield current.value;
      current = current.next;
    } while (current !== this.#head);
  }

  *entries() {
    if (this.empty()) return;

    let current = this.#head;
    let index = 0;

    do {
      yield [index, current.value];
      current = current.next;
      index++;
    } while (current !== this.#head);
  }
}
