class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
export class LinkedList {
  constructor() {
    this.headNode = null;
  }
  append(value) {
    let newNode = new Node(value);

    if (!this.headNode) {
      this.headNode = newNode;
      return;
    }
    let currentNode = this.headNode;
    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = newNode;
  }

  prepend(value) {
    let newNode = new Node(value);
    if (!this.headNode) {
      this.headNode = newNode;
      return;
    }
    newNode.nextNode = this.headNode;
    this.headNode = newNode;
  }
  size() {
    let length = 0;
    let currentNode = this.headNode;

    while (currentNode !== null) {
      length++;
      currentNode = currentNode.nextNode;
    }
    return length;
  }

  head() {
    if (!this.headNode) {
      return null;
    }
    return this.headNode;
  }

  tail() {
    if (!this.headNode) return null;
    let currentNode = this.headNode;

    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  at(index) {
    if (!this.headNode) return null;

    let currentNode = this.headNode;
    let currentIndex = 0;

    while (currentNode !== null) {
      if (currentIndex === index) {
        return currentNode;
      }
      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    return null;
  }

  pop() {
    if (!this.headNode) return null;
    if (!this.headNode.nextNode) {
      this.headNode = null;
      return;
    }
    let currentNode = this.headNode;
    while (currentNode.nextNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = null;
  }

  contains(value) {
    if (!this.headNode) {
      return false;
    }
    let currentNode = this.headNode;
    while (currentNode !== null) {
      if (currentNode.value == value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  find(value) {
    if (!this.headNode) {
      return null;
    }
    let currentNode = this.headNode;
    let index = 0;
    while (currentNode !== null) {
      if (currentNode.value == value) {
        return index;
      }
      currentNode = currentNode.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    let currentNode = this.headNode;
    let string = "";
    while (currentNode !== null) {
      string += `( ${currentNode.value} ) --> `;
      currentNode = currentNode.nextNode;
    }
    string += "null";
    return string;
  }

  insertAt(value, index) {
    let newNode = new Node(value);
    let currentNode = this.headNode;
    let currentIndex = 0;

    if (index == 0) {
      newNode.nextNode = this.headNode;
      this.headNode = newNode;
      return;
    }

    while (currentIndex !== index - 1) {
      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    let laterNode = currentNode.nextNode;
    currentNode.nextNode = newNode;
    newNode.nextNode = laterNode;
  }
  removeAt(index) {
    let currentNode = this.headNode;
    let currentIndex = 0;
    let previousNode;

    if (index === 0) {
      this.headNode = currentNode.nextNode;
      return;
    }

    while (currentNode !== null) {
      if (currentIndex === index) {
        previousNode.nextNode = currentNode.nextNode;
        return;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
      currentIndex++;
    }
  }
}
