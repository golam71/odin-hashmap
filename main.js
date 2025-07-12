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
    this.buckets = [, , , , , , , , , , , , , , , ,];
  }
  length() {
    return this.buckets.length;
  }
  clear() {
    this.buckets = [];
  }
  get(key) {
    let hashKey = this.hash(key);
    let bucketIndex = hashKey % this.length();

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
    let bucketIndex = hashKey % this.length();
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
}

let x = new Hashmap();
// console.log(x.length());
x.set("hello", "world");
x.set("foo", "bar");
x.set("baz", "qux");
x.set("test", "value");

// console.log(x.buckets);
console.log(x.get("key49"));
