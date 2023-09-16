class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}


class Queue {
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
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  pop() {
    if (!this.head) {
      throw new Error("Queue is empty");
    }
    const data = this.head.data;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    return data;
  }
}

const queue = new Queue();

queue.push(10);
queue.push(11);


console.log(queue);

