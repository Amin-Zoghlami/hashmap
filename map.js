import LinkedList from "./list.js";

export default class HashMap {
  #map = [];
  #capacity = 0;
  #loadFactor = 0;

  constructor() {
    this.#createMap(16);
    this.#capacity = 16;
    this.#loadFactor = 0.75;
  }

  #createMap(size) {
    for (let i = 0; i < size; i++) {
      this.#map.push(new LinkedList());
    }
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.#capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const bucket = this.#map[this.#hash(key)];

    if (this.has(key)) {
      for (let i = 0; i < bucket.size(); i++) {
        if (bucket.at(i).value[0] === key) {
          bucket.at(i).value[1] = value;
          return;
        }
      }
    }

    bucket.append([key, value]);

    if (this.#capacity * this.#loadFactor < this.length()) {
      const entries = this.entries();

      this.#map = [];
      this.#capacity *= 2;

      this.#createMap(this.#capacity);
      for (const entry of entries) this.set(entry[0], entry[1]);
    }
  }

  get(key) {
    const bucket = this.#map[this.#hash(key)];

    for (let i = 0; i < bucket.size(); i++) {
      if (bucket.at(i).value[0] === key) {
        return bucket.at(i).value[1];
      }
    }

    return null;
  }

  has(key) {
    const bucket = this.#map[this.#hash(key)];

    for (let i = 0; i < bucket.size(); i++) {
      if (bucket.at(i).value[0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const bucket = this.#map[this.#hash(key)];

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
    this.#createMap(16);
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
