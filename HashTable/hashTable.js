import { Node, LinkedList } from "./SinglyLinkedList.js";

class HashTable {
  #table;
  #capacity;
  #size;
  #loadFactor;

  constructor(capacity = 16, loadFactor = 0.75) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Capacity must be a positive integer");
    }

    if (typeof loadFactor !== "number" || loadFactor <= 0) {
      throw new Error("Load factor must be a positive number");
    }

    this.#capacity = capacity;
    this.#size = 0;
    this.#loadFactor = loadFactor;
    this.#table = new Array(capacity);

    for (let i = 0; i < capacity; i++) {
      this.#table[i] = new LinkedList();
    }
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
    this.#table = new Array(this.#capacity);

    for (let i = 0; i < this.#capacity; i++) {
      this.#table[i] = new LinkedList();
    }

    this.#size = 0;
  }

  #hash(key) {
    const PRIME = 31;
    let hash = 0;

    if (typeof key === "number") {
      while (key > 0) {
        hash = (hash * PRIME + (key % 10)) >>> 0;
        key = Math.floor(key / 10);
      }
    } else if (typeof key === "string") {
      for (let i = 0; i < key.length; i++) {
        hash = (hash * PRIME + key.charCodeAt(i)) >>> 0;
      }
    } else {
      throw new Error("Invalid key type");
    }

    return hash % this.#capacity;
  }

  put(key, value) {
    if ((this.#size + 1) / this.#capacity > this.#loadFactor) {
      this.#resize(this.#capacity * 2);
    }

    let index = this.#hash(key);
    let bucket = this.#table[index];

    let curr = bucket.head;

    while (curr) {
      if (curr.key === key) {
        curr.value = value;
        return;
      }
      curr = curr.next;
    }

    const newNode = new Node(key, value);

    newNode.next = bucket.head;
    bucket.head = newNode;
    ++this.#size;
  }

  get(key) {
    const index = this.#hash(key);
    return this.#table[index].find(key);
  }

  remove(key) {
    const index = this.#hash(key);
    const bucket = this.#table[index];

    let res = bucket.remove(key);

    if (res !== undefined) {
      --this.#size;
    }
    return res;
  }

  containsKey(key) {
    const index = this.#hash(key);
    return this.#table[index].find(key) !== undefined;
  }

  containsValue(value) {
    for (let bucket of this.#table) {
      let curr = bucket.head;

      while (curr) {
        if (curr.value === value) return true;
        curr = curr.next;
      }
    }

    return false;
  }

  #resize(newCapacity) {
    const oldTable = this.#table;

    this.#capacity = newCapacity;
    this.#table = new Array(newCapacity);

    for (let i = 0; i < newCapacity; i++) {
      this.#table[i] = new LinkedList();
    }

    this.#size = 0;

    for (let bucket of oldTable) {
      let curr = bucket.head;

      while (curr) {
        this.put(curr.key, curr.value);
        curr = curr.next;
      }
    }
  }

  loadFactor() {
    return this.#size / this.#capacity;
  }

  keys() {
    const res = [];

    for (let bucket of this.#table) {
      let curr = bucket.head;

      while (curr) {
        res.push(curr.key);
        curr = curr.next;
      }
    }

    return res;
  }

  values() {
    const res = [];

    for (let bucket of this.#table) {
      let curr = bucket.head;

      while (curr) {
        res.push(curr.value);
        curr = curr.next;
      }
    }

    return res;
  }

  entries() {
    const res = [];

    for (let bucket of this.#table) {
      let curr = bucket.head;

      while (curr) {
        res.push([curr.key, curr.value]);
        curr = curr.next;
      }
    }

    return res;
  }

  bucketSizes() {
    const res = [];

    for (let bucket of this.#table) {
      res.push(bucket.size);
    }
    return res;
  }

  *[Symbol.iterator]() {
    for (let bucketIdx = 0; bucketIdx < this.#capacity; bucketIdx++) {
      let curr = this.#table[bucketIdx].head;

      while (curr) {
        yield [curr.key, curr.value];
        curr = curr.next;
      }
    }
  }

  toObject() {
    const obj = {};

    for (let [key, value] of this) {
      obj[key] = value;
    }

    return obj;
  }

  clone() {
    const copy = new HashTable(this.#capacity, this.#loadFactor);

    for (let [key, value] of this) {
      copy.put(key, value);
    }

    return copy;
  }

  equals(other) {
    if (this.#size !== other.size()) return false;

    for (let [key, value] of this) {
      if (other.get(key) !== value) return false;
    }

    return true;
  }

  print() {
    for (let i = 0; i < this.#capacity; i++) {
      console.log("Bucket " + i + ":");

      let curr = this.#table[i].head;

      if (curr === null) {
        console.log("null");
      }

      while (curr !== null) {
        console.log("(" + curr.key + ": " + curr.value + ")");
        curr = curr.next;
      }
    }
  }
}
