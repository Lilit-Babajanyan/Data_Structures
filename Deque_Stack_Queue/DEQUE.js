export class BucketedDeque {
  #everyBucketsLength = 8; // capacity of one bucket
  #bucketSize = 4; // number of buckets currently allocated?
  #buckets; // array of buckets
  #frontBucket; // bucket containing first element
  #backBucket; // bucket containing last element
  #frontIndex; // index of first element inside front bucket
  #backIndex; // index where the next back element will be inserted
  #size = 0; // total number of elements


  constructor(everyBucketsLength) {
    if (
      Number.isInteger(everyBucketsLength) &&
      everyBucketsLength > this.#everyBucketsLength
    ) {
      this.#everyBucketsLength = everyBucketsLength;
    }

    
    this.#buckets = new Array(this.#bucketSize);

    for (let i = 0; i < this.#bucketSize; ++i) {
      this.#buckets[i] = new Array(this.#everyBucketsLength).fill(null);
    }

    const middle = Math.floor(this.#bucketSize / 2);

    this.#frontBucket = middle - 1;
    this.#frontIndex = this.#everyBucketsLength - 1;

    this.#backBucket = middle;
    this.#backIndex = 0;
  }

  #ensureBucket() {
    const newBucketSize = this.#bucketSize * 2;
    const newBuckets = new Array(newBucketSize);

    for (let i = 0; i < newBucketSize; ++i) {
      newBuckets[i] = new Array(this.#everyBucketsLength).fill(null);
    }

    const shift = Math.floor(this.#bucketSize / 2);

    for (let k = 0; k < this.#bucketSize; ++k) {
      newBuckets[k + shift] = this.#buckets[k];
    }

    this.#frontBucket += shift;
    this.#backBucket += shift;

    this.#buckets = newBuckets;
    this.#bucketSize = newBucketSize;
  }

  push_front(value) {
    if (this.#frontIndex < 0) {
      this.#frontBucket -= 1;
      this.#frontIndex = this.#everyBucketsLength - 1;

      if (this.#frontBucket < 0) {
        this.#ensureBucket();
      }
    }

    this.#buckets[this.#frontBucket][this.#frontIndex] = value;
    this.#frontIndex -= 1;
    this.#size += 1;
  }

  
  push_back(value) {
    if (this.#backIndex > this.#everyBucketsLength - 1) {
      this.#backBucket += 1;
      this.#backIndex = 0;

      if (this.#backBucket >= this.#bucketSize) {
        this.#ensureBucket();
      }
    }

    this.#buckets[this.#backBucket][this.#backIndex] = value;
    this.#backIndex += 1;
    this.#size += 1;
  }

  pop_front() {
    if (this.#size === 0) {
      throw new Error("Deque is Empty:");
    }

    this.#frontIndex += 1;

    if (this.#frontIndex >= this.#everyBucketsLength) {
      this.#frontBucket += 1;
      this.#frontIndex = 0;
    }

    const value = this.#buckets[this.#frontBucket][this.#frontIndex];

    this.#buckets[this.#frontBucket][this.#frontIndex] = null;
    this.#size -= 1;

    return value;
  }

  pop_back() {
    if (this.#size === 0) {
      throw new Error("Deque is Empty:");
    }

    this.#backIndex -= 1;

    if (this.#backIndex < 0) {
      this.#backBucket -= 1;
      this.#backIndex = this.#everyBucketsLength - 1;
    }

    const value = this.#buckets[this.#backBucket][this.#backIndex];

    this.#buckets[this.#backBucket][this.#backIndex] = null;
    this.#size -= 1;

    return value;
  }

  front() {
    if (this.#size === 0) {
      throw new Error("Deque is Empty");
    }

    return this.#buckets[this.#frontBucket][this.#frontIndex + 1];
  }

  back() {
    if (this.#size === 0) {
      throw new Error("Deque is Empty");
    }

    return this.#buckets[this.#backBucket][this.#backIndex - 1];
  }

  clear() {
    this.#bucketSize = 4;
    this.#size = 0;
    this.#buckets = new Array(this.#bucketSize);

    for (let i = 0; i < this.#bucketSize; ++i) {
      this.#buckets[i] = new Array(this.#everyBucketsLength).fill(null);
    }

    const middle = Math.floor(this.#bucketSize / 2);

    this.#frontBucket = middle - 1;
    this.#frontIndex = this.#everyBucketsLength - 1;

    this.#backBucket = middle;
    this.#backIndex = 0;
  }

  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  toArray() {
    let res = [];

    let bucket = this.#frontBucket;
    let idx = this.#frontIndex + 1;

    for (let k = 0; k < this.#size; ++k) {
      if (idx >= this.#everyBucketsLength) {
        ++bucket;
        idx = 0;
      }
      res.push(this.#buckets[bucket][idx]);
      ++idx;
    }

    return res;
  }

  at(globalIndex) {
    if (
      !Number.isInteger(globalIndex) ||
      globalIndex < 0 ||
      globalIndex >= this.#size
    ) {
      throw new Error("Invalid index");
    }

    let position = this.#bucketIndex(globalIndex);

    return this.#buckets[position.bucketIdx][position.localIdx];
  }

  #bucketIndex(globalIndex) {
    if (
      !Number.isInteger(globalIndex) ||
      globalIndex < 0 ||
      globalIndex >= this.#size
    ) {
      return undefined;
    }

    let absoluteIndex = this.#frontIndex + 1 + globalIndex;
    let localIdx = absoluteIndex % this.#everyBucketsLength;
    let bucketIdx =
      this.#frontBucket + Math.floor(absoluteIndex / this.#everyBucketsLength);

    return { localIdx, bucketIdx };
  }

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if (index < this.#size) {
          return {
            value: this.at(index++),
            done: false,
          };
        }

        return {
          value: undefined,
          done: true,
        };
      },
    };
  }
}

const d = new BucketedDeque();

d.push_back(1);
d.push_back(2);
d.push_front(0);

console.log(d.toArray());

console.log(d.pop_front());
console.log(d.pop_back());

console.log(d.toArray());

d.push_back(10);
d.push_back(20);
d.clear();

console.log(d.size());
console.log(d.isEmpty());
console.log(d.toArray());

d.push_back(5);
d.push_front(4);
d.push_back(6);

console.log(d.toArray());

for (const x of d) {
  console.log(x);
}
