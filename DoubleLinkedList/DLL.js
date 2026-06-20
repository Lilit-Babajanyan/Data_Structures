class Node {
  constructor(value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class DLL {
  #head;
  #tail;

  constructor(value) {
    if (value === undefined) {
      this.#head = null;
      this.#tail = null;
    } else {
      const node = new Node(value);
      this.#head = node;
      this.#tail = node;
    }
  }

  isEmpty() {
    return this.#head === null;
  }

  size() {
    let curr = this.#head;
    let size = 0;

    while (curr !== null) {
      size++;
      curr = curr.next;
    }

    return size;
  }

  clear() {
    this.#head = null;
    this.#tail = null;
  }

  front() {
    if (this.isEmpty()) {
      throw new Error("The list is empty");
    }

    return this.#head.value;
  }

  back() {
    if (this.isEmpty()) {
      throw new Error("The list is empty");
    }

    return this.#tail.value;
  }

  at(index) {
    if (index < 0 || index >= size) {
      throw new Error("Invalid index");
    }

    let current;
    const length = this.size();

    if (index < size / 2) {
      current = this.#head;

      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.#tail;

      for (let i = size - 1; i > index; i--) {
        current = current.prev;
      }
    }
    return current.value;
  }

  pushFront(value) {
    const newNode = new Node(value);

    if (this.#head === null) {
      this.#head = newNode;
      this.#tail = newNode;
      return;
    }

    newNode.next = this.#head;
    this.#head.prev = newNode;
    this.#head = newNode;
  }

  pushBack(value) {
    const newNode = new Node(value);

    if (this.#head === null) {
      this.#head = newNode;
      this.#tail = newNode;
      return;
    }

    newNode.prev = this.#tail;
    this.#tail.next = newNode;
    this.#tail = newNode;
  }

  popFront() {
    if (this.#head === null) {
      throw new Error("List is empty");
    }

    if (this.#head === this.#tail) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#head = this.#head.next;
      this.#head.prev = null;
    }

    const removedValue = this.#head.value;
    return removedValue;
  }

  popBack() {
    if (this.#head === null) {
      throw new Error("List is empty");
    }

    if (this.#head === this.#tail) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#tail = this.#tail.prev;
      this.#tail.next = null;
    }

    const removedValue = this.#head.value;
    return removedValue;
  }

  insert(index, value) {
    const size = this.size();
    if (index < 0 || index > size) {
      throw new Error("Invalid index");
    }

    if (index === 0) {
      this.pushFront(value);
      return;
    }

    if (index === size) {
      this.pushBack(value);
      return;
    }

    let curr = this.#head;

    let i = 0;

    while (i < index) {
      curr = curr.next;
      i++;
    }

    const node = new Node(value);

    node.next = curr;
    node.prev = curr.prev;

    curr.prev.next = node;
    curr.prev = node;
  }

  erase(index) {
    const size = this.size();

    if (index < 0 || index >= size) {
      throw new Error("Invalid index");
    }

    if (index === 0) {
      return this.popFront();
    }

    if (index === size - 1) {
      return this.popBack();
    }

    let current = this.#head;

    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    const removedValue = current.value;

    current.prev.next = current.next;
    current.next.prev = current.prev;

    return removedValue;
  }

  find(value) {
    let i = 0;
    let current = this.#head;

    while (current !== null) {
      if (current.value === value) {
        return index;
      }

      current = current.next;
      i++;
    }

    return -1;
  }

  contains(value) {
    return this.find(value) !== -1;
  }

  toArray() {
    const res = [];

    let current = this.#head;

    while (current !== null) {
      res.push(current.value);
      current = current.next;
    }

    return res;
  }

  reverse() {
    let current = this.#head;

    while (current !== null) {
      const temp = current.next;

      current.next = current.prev;
      current.prev = temp;

      current = temp;
    }

    const temp = this.#head;
    this.#head = this.#tail;
    this.#tail = temp;
  }

  *reverseIterator() {
    let current = this.#tail;

    while (current !== null) {
      yield current.value;
      current = current.prev;
    }
  }

  *entries() {
    let current = this.#head;
    let idx = 0;

    while (current !== null) {
      yield [idx, current.value];
      idx++;
      current = current.next;
    }
  }
}

const list = new DLL();

list.pushBack(10);
list.pushBack(20);
list.pushBack(30);

list.insert(1, 15);

console.log(list.toArray());

list.erase(2);

console.log(list.toArray());

list.reverse();

console.log(list.toArray());

console.log(list.front());

console.log(list.back());
