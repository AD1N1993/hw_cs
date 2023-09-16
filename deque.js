class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  push(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  unshift(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  pop() {
    if (!this.tail) {
      throw new Error("Deque is empty");
    }
    const data = this.tail.data;
    this.tail = this.tail.prev;
    if (!this.tail) {
      this.head = null;
    } else {
      this.tail.next = null;
    }
    return data;
  }

  shift() {
    if (!this.head) {
      throw new Error("Deque is empty");
    }
    const data = this.head.data;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    } else {
      this.head.prev = null;
    }
    return data;
  }
}

const dequeue = new Deque();

dequeue.push(10);
dequeue.unshift(11);
dequeue.push(12);

console.log(dequeue.pop());   // 12
console.log(dequeue.shift()); // 11
console.log(dequeue.pop());   // 10
// console.log(dequeue.pop());   // Exception
