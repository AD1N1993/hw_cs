class Stack {
  constructor(arrayType, maxLength) {
    this.stack = new arrayType(maxLength);
    this.maxLength = maxLength;
    this.top = -1;
  }

  push(data) {
    if (this.top < this.maxLength - 1) {
      this.top++;
      this.stack[this.top] = data;
    } else {
      throw new Error("Stack is full");
    }
  }

  pop() {
    if (this.top >= 0) {
      const data = this.stack[this.top];
      this.top--;
      return data;
    } else {
      throw new Error("Stack is empty");
    }
  }

  get head() {
    if (this.top >= 0) {
      return this.stack[this.top];
    } else {
      throw new Error("Stack is empty");
    }
  }
}

const stack = new Stack(Int32Array, 10);

stack.push(10);
stack.push(11);
stack.push(12);

console.log(stack);

console.log(stack.head);  // 12

// console.log(stack.pop()); // 12
//
// console.log(stack.head);  // 11
//
// console.log(stack.pop()); // 11
// console.log(stack.pop()); // 10
// console.log(stack.pop()); // Exception
