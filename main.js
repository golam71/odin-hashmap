class Node {
  constructor(key, value, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

class Hashmap {
  constructor() {
    this.loadFactor = 0.75;
    this.buckets = new Array(16);
  }
  length() {
    return this.keys().length;
  }
  clear() {
    this.buckets = [];
  }
  get(key) {
    let hashKey = this.hash(key);
    let bucketIndex = hashKey % this.buckets.length;
    if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    // console.log(this.buckets[bucketIndex]);
    let currentNode = this.buckets[bucketIndex];
    while (currentNode != null) {
      if (currentNode.key == key) {
        return currentNode.value;
      }
      currentNode = currentNode.nextNode;
    }
    return null;
  }
  has(key) {
    let hashKey = this.hash(key);
    let bucketIndex = hashKey % this.buckets.length;
    if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    let currentNode = this.buckets[bucketIndex];
    while (currentNode != null) {
      if (currentNode.key == key) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);

      //always keep 12 digit numbers
      hashCode = hashCode.toString().slice(0, 12);
      hashCode = Number(hashCode);
    }

    return hashCode;
  }
  set(key, value) {
    let hashKey = this.hash(key);
    let bucketIndex = hashKey % this.buckets.length;
    let node = new Node(key, value);

    if (this.buckets[bucketIndex] == undefined) {
      this.buckets[bucketIndex] = node;
    } else {
      let currentNode = this.buckets[bucketIndex];
      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = node;
    }
  }
  remove(key) {
    let hashKey = this.hash(key);
    let bucketIndex = hashKey % this.buckets.length;
    let currentNode = this.buckets[bucketIndex];
    let previousNode = null;

    if (!currentNode) return false;

    while (currentNode !== null) {
      if (currentNode.key === key) {
        if (previousNode === null) {
          this.buckets[bucketIndex] = currentNode.nextNode;
        } else {
          previousNode.nextNode = currentNode.nextNode;
        }
        return true;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }

    return false;
  }
  keys() {
    let keysArray = [];
    for (const item in this.buckets) {
      let currentNode = this.buckets[item];
      while (currentNode !== null) {
        keysArray.push(currentNode.key);
        currentNode = currentNode.nextNode;
      }
    }
    return keysArray;
  }
  values() {
    let valuesArray = [];
    for (const item in this.buckets) {
      let currentNode = this.buckets[item];
      while (currentNode !== null) {
        valuesArray.push(currentNode.value);
        currentNode = currentNode.nextNode;
      }
    }
    return valuesArray;
  }
  entries() {
    let entityArray = [];
    for (const item in this.buckets) {
      let currentNode = this.buckets[item];
      while (currentNode !== null) {
        let tempArray = [];
        tempArray.push(currentNode.key);
        tempArray.push(currentNode.value);
        entityArray.push(tempArray);
        currentNode = currentNode.nextNode;
      }
    }
    return entityArray;
  }
}

let x = new Hashmap();
// console.log(x.length());
x.set("hello", "world");
x.set("foo", "bar");
x.set("baz", "qux");
x.set("test", "value");
x.set("apple", "red");
x.set("banana", "yellow");
x.set("carrot", "orange");
x.set("dog", "brown");
x.set("elephant", "gray");
x.set("frog", "green");

console.log(x.length());
