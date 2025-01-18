import LinkedList from "./list.js";

export default class HashMap {
  #map = [];
  #capacity = 0;
  static loadFactor = 0.75;

  constructor() {
    this.#createMap();
  }

  #createMap() {
    for (let i = 0; i < 16; i++) {
      this.#map.push(new LinkedList());
    }

    this.#capacity = 16;
  }

  #doubleCapacity() {
    for (let i = 0; i < this.#capacity; i++) {
      this.#map.push(new LinkedList());
    }

    this.#capacity *= 2;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.#map.length;
    }

    return hashCode;
  }

  set(key, value) {
    const bucket = this.#map[this.hash(key)];

    if (this.has(key)) {
      for (let i = 0; i < bucket.size(); i++) {
        if (bucket.at(i).value[0] === key) {
          bucket.at(i).value[1] = value;
          return;
        }
      }
    }

    bucket.append([key, value]);

    if (this.#capacity * this.loadFactor <= this.length()) {
      this.#doubleCapacity();
    }
  }

  get(key) {
    const bucket = this.#map[this.hash(key)];

    for (let i = 0; i < bucket.size(); i++) {
      if (bucket.at(i).value[0] === key) {
        return bucket.at(i).value[1];
      }
    }

    return null;
  }

  has(key) {
    const bucket = this.#map[this.hash(key)];

    for (let i = 0; i < bucket.size(); i++) {
      if (bucket.at(i).value[0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const bucket = this.#map[this.hash(key)];

    for (let i = 0; i < bucket.size(); i++) {
      if (bucket.at(i).value[0] === key) {
        bucket.removeAt(i);
        return true;
      }
    }

    return false;
  }

  length() {
    let length = 0;

    for (const bucket of this.#map) {
      length += bucket.size();
    }

    return length;
  }

  clear() {
    this.#map = [];
  }

  keys() {
    const keys = [];

    for (const bucket of this.#map) {
      for (let i = 0; i < bucket.size(); i++) {
        keys.push(bucket.at(i).value[0]);
      }
    }

    return keys;
  }

  values() {
    const values = [];

    for (const bucket of this.#map) {
      for (let i = 0; i < bucket.size(); i++) {
        values.push(bucket.at(i).value[1]);
      }
    }

    return values;
  }

  entries() {
    const entries = [];

    for (const bucket of this.#map) {
      for (let i = 0; i < bucket.size(); i++) {
        entries.push(bucket.at(i).value);
      }
    }

    return entries;
  }
}
