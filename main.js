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
    this.buckets = new Array(16);
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
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * prime + key.charCodeAt(i)) % this.buckets.length;
    }
    return hashCode;
  }

  resize() {
    let maxLoad = this.buckets.length * this.loadFactor;

    if (this.length() >= maxLoad) {
      let entityArray = this.entries();
      this.buckets = new Array(this.buckets.length * 2);

      for (const [key, value] of entityArray) {
        this.set(key, value);
      }
    }
  }

  set(key, value) {
    let hashKey = this.hash(key);
    let bucketIndex = hashKey % this.buckets.length;
    let node = new Node(key, value);

    if (this.buckets[bucketIndex] == undefined) {
      this.buckets[bucketIndex] = node;
    } else {
      let currentNode = this.buckets[bucketIndex];
      while (true) {
        if (currentNode.key === key) {
          currentNode.value = value;
          return; // key already exists, just update
        }
        if (currentNode.nextNode === null) break;
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = node; // only append if key not found
    }
    this.resize();
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

///test

const test = new Hashmap(); // Already using loadFactor 0.75 and initial capacity 16

// Initial population
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// Length should be 12
console.log("Length:", test.length()); // output: 12

// Overwriting some values
test.set("apple", "green");
test.set("dog", "white");
test.set("lion", "yellow");

// Length should still be 12
console.log("Length after overwrites:", test.length()); // output: 12

// Trigger resize
test.set("moon", "silver");

// Check that resizing worked by checking new length
console.log("Length after adding moon:", test.length()); // output: 13

// Overwrite again
test.set("banana", "brown");
console.log("Get banana:", test.get("banana")); // output: brown

// Test has()
console.log("Has frog:", test.has("frog")); // output: true
console.log("Has cat:", test.has("cat")); // output: false

// Test remove()
console.log("Remove frog:", test.remove("frog")); // output: true
console.log("Remove cat:", test.remove("cat")); // output: false
console.log("Has frog after removal:", test.has("frog")); // output: false

// Test keys()
console.log("Keys:", test.keys()); // output: list of keys (order not guaranteed)

// Test values()
console.log("Values:", test.values()); // output: list of values (order not guaranteed)

// Test entries()
console.log("Entries:", test.entries()); // output: list of [key, value] pairs (order not guaranteed)

// Test clear()
test.clear();
console.log("Length after clear:", test.length()); // output: 0
console.log("Entries after clear:", test.entries()); // output: []
