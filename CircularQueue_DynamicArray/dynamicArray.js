export class DynamicArray {
  #arr;
  #size;
  #capacity;
  #GROWTH;
  #fill;

  constructor(capacity = 8, fill = 0) {
    if (!Number.isInteger(capacity)) {
      throw new Error("Capacity must be an integer.");
    }
    if (capacity <= 0) {
      throw new Error("Capacity must be positive number.");
    }
    if (!Number.isInteger(fill)) {
      throw new Error("Fill must be an integer.");
    }

    this.#capacity = capacity;
    this.#size = 0;
    this.#GROWTH = 2;
    this.#fill = fill;
    this.#arr = new Int32Array(capacity).fill(fill);
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
    this.#arr.fill(this.#fill);
    this.#size = 0;
  }

  at(index) {
    if (!Number.isInteger(index)) {
      throw new Error("Index must be an integer.");
    }
    if (index < 0 || index >= this.#size) {
      throw new Error("Index Error: Out of range.");
    }
    return this.#arr[index];
  }

  set(index, value) {
    if (!Number.isInteger(index)) {
      throw new Error("Index must be an integer.");
    }
    if (!Number.isInteger(value)) {
      throw new Error("Value must be an integer.");
    }
    if (index < 0 || index >= this.#size) {
      throw new Error("Index Error: Out of range.");
    }

    this.#arr[index] = value;
  }

  #resize(newCap) {
    if (!Number.isInteger(newCap)) {
      throw new Error("newCap must be an integer.");
    }
    if (newCap <= 0) {
      throw new Error("newCap must be >= 0.");
    }

    const newArr = new Int32Array(newCap).fill(this.#fill);

    for (let i = 0; i < this.#size; ++i) {
      newArr[i] = this.#arr[i];
    }

    this.#arr = newArr;
    this.#capacity = newCap;
  }

  pushBack(value) {
    if (!Number.isInteger(value)) {
      throw new Error("Value must be an integer.");
    }

    if (this.#size === this.#capacity) {
      this.#resize(this.#capacity * this.#GROWTH);
    }

    this.#arr[this.#size++] = value;
  }

  popBack() {
    if (this.isEmpty()) {
      throw new Error("Empty Array!");
    }

    const res = this.#arr[--this.#size];
    this.#arr[this.#size] = this.#fill;

    return res;
  }

  front() {
    if (this.isEmpty()) return undefined;
    return this.#arr[0];
  }

  back() {
    if (this.isEmpty()) return undefined;
    return this.#arr[this.#size - 1];
  }

  insert(index, value) {
    if (!Number.isInteger(index)) {
      throw new Error("Index must be an integer.");
    }
    if (!Number.isInteger(value)) {
      throw new Error("Value must be an integer.");
    }
    if (index < 0 || index > this.#size) {
      throw new Error("Index Error: Out of range.");
    }

    if (this.#size === this.#capacity) {
      this.#resize(this.#capacity * this.#GROWTH);
    }

    for (let i = this.#size; i > index; --i) {
      this.#arr[i] = this.#arr[i - 1];
    }

    this.#arr[index] = value;
    ++this.#size;
  }

  erase(index) {
    if (!Number.isInteger(index)) {
      throw new Error("Index must be an integer.");
    }
    if (index < 0 || index >= this.#size) {
      throw new Error("Index Error: Out of range.");
    }

    for (let i = index; i < this.#size - 1; ++i) {
      this.#arr[i] = this.#arr[i + 1];
    }

    this.#arr[--this.#size] = this.#fill;
  }

  toArray() {
    const res = new Array(this.#size);

    for (let i = 0; i < this.#size; ++i) {
      res[i] = this.#arr[i];
    }

    return res;
  }

  *entries() {
    for (let i = 0; i < this.#size; ++i) {
      yield [i, this.#arr[i]];
    }
  }

  [Symbol.iterator]() {
    let i = 0;

    return {
      next: () => {
        if (i >= this.#size) {
          return { done: true };
        }

        return {
          value: this.#arr[i++],
          done: false,
        };
      },
    };
  }

  swap(i, j) {
    if (!Number.isInteger(i) || !Number.isInteger(j)) {
      throw new Error("Index must be integer.");
    }

    if (i < 0 || j < 0 || i >= this.#size || j >= this.#size) {
      throw new Error("Index Error: Out of range.");
    }

    let temp = this.#arr[i];
    this.#arr[i] = this.#arr[j];
    this.#arr[j] = temp;
  }

  reverse() {
    let i = 0;
    let j = this.#size - 1;

    while (i < j) {
      this.swap(i++, j--);
    }
  }
}
