import Node from "./node.js";

export default class LinkedList {
  #head = null;

  append(value) {
    const newNode = new Node();
    newNode.value = value;

    if (this.#head === null) {
      this.#head = newNode;
      return;
    }

    let currNode = this.#head;
    while (currNode.nextNode !== null) {
      currNode = currNode.nextNode;
    }
    currNode.nextNode = newNode;
  }

  prepend(value) {
    const newNode = new Node();
    newNode.value = value;

    newNode.nextNode = this.#head;

    this.#head = newNode;
  }

  size() {
    let i = 0;
    let currNode = this.#head;
    while (currNode !== null) {
      currNode = currNode.nextNode;
      i++;
    }

    return i;
  }

  head() {
    return this.#head;
  }

  tail() {
    if (this.#head === null) {
      return null;
    }

    let currNode = this.#head;
    while (currNode.nextNode !== null) {
      currNode = currNode.nextNode;
    }

    return currNode;
  }

  at(index) {
    let currNode = this.#head;

    for (let i = 0; i <= index; i++) {
      if (currNode === null) {
        return null;
      }

      if (i === index) {
        return currNode;
      }

      currNode = currNode.nextNode;
    }
  }

  pop() {
    if (this.#head === null) {
      return;
    }

    let currNode = this.#head;
    while (currNode.nextNode.nextNode !== null) {
      currNode = currNode.nextNode;
    }

    currNode.nextNode = null;
  }

  contains(value) {
    let currNode = this.#head;

    while (currNode !== null) {
      if (currNode.value === value) {
        return true;
      }

      currNode = currNode.nextNode;
    }

    return false;
  }

  find(value) {
    let currNode = this.#head;
    let i = 0;

    while (currNode !== null) {
      if (currNode.value === value) {
        return i;
      }

      currNode = currNode.nextNode;
      i++;
    }

    return null;
  }

  toString() {
    let currNode = this.#head;
    let string = "";

    while (currNode !== null) {
      string = string.concat(`( ${currNode.value} ) -> `);

      currNode = currNode.nextNode;
    }

    return string.concat("null");
  }

  insertAt(value, index) {
    const newNode = new Node();
    newNode.value = value;

    if (index === 0) {
      newNode.nextNode = this.#head;
      this.#head = newNode;
      return;
    }

    let currNode = this.#head;
    let i = 0;

    while (currNode !== null) {
      if (i === index - 1) {
        newNode.nextNode = currNode.nextNode;
        currNode.nextNode = newNode;
        return;
      }

      currNode = currNode.nextNode;
      i++;
    }
  }

  removeAt(index) {
    if (this.#head === null) {
      return;
    }

    if (index === 0) {
      this.#head = this.#head.nextNode;
      return;
    }

    let currNode = this.#head;
    let i = 0;

    while (currNode.nextNode !== null) {
      if (i === index - 1) {
        currNode.nextNode = currNode.nextNode.nextNode;
        return;
      }

      currNode = currNode.nextNode;
      i++;
    }
  }
}
