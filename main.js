import { LinkedList } from "./linkedList.js";

class Hashmap {
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
}

let x = new Hashmap();
console.log(x.hash("test"));
