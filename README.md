# Custom Hashmap in JavaScript

A simple implementation of a Hashmap (Hash Table) using separate chaining for collision handling.

## Features

- Supports `set`, `get`, `has`, `remove`, `keys`, `values`, `entries`, and `clear` methods
- Dynamically resizes based on load factor
- Handles hash collisions using linked list chaining
- Basic hashing with modulo bucket count

## Usage

```js
const map = new Hashmap();

map.set("apple", "red");
map.set("banana", "yellow");

console.log(map.get("apple")); // "red"
console.log(map.has("banana")); // true

map.remove("apple");
console.log(map.get("apple")); // null

console.log(map.keys()); // ["banana"]
console.log(map.values()); // ["yellow"]
console.log(map.entries()); // [["banana", "yellow"]]

map.clear();
console.log(map.length()); // 0
```
