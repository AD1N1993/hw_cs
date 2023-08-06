class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.first = null;
    this.last = null;
  }

  add(value) {
    const newNode = new Node(value);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      newNode.prev = this.last;
      this.last.next = newNode;
      this.last = newNode;
    }
  }

  [Symbol.iterator](){
    let current = this.first;

    return {
      next(){
        if (current) {
          const value = current.value;
          current = current.next;
          return {value: value, done: false};
        } else {
          return {done: true};
        }
      }
    }
  }
}

const list = new LinkedList();

list.add(1);
list.add(2);
list.add(3);

console.log(list.first.value);           // 1
console.log(list.last.value);            // 3
console.log(list.first.next.value);      // 2
console.log(list.first.next.prev.value); // 1

for (let listElement of list) {
  console.log(`el ${listElement}`);
}

function Structure(fields) {
  const fieldSizes = {
    'utf16': 2,
    'u16': 2,
  };

  let totalSize = 0;

  const offsets = fields.reduce((acc, [name, type, length]) => {
    acc[name] = {
      offset: totalSize,
      type,
      length: type === 'utf16' ? length : 1
    };



    totalSize += fieldSizes[type] * (type === 'utf16' ? length : 1);
    return acc;
  }, {});

  console.log(totalSize);

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);

  return {
    set(key, value) {
      const { offset, type, length } = offsets[key];

      switch (type) {
        case 'utf16':
          for (let i = 0; i < length; i++) {
            const char = value.charCodeAt(i);
            console.log(value[i]);
            console.log(char);
            console.log(offset);
            if (char !== undefined) {
              view.setUint16(offset + i * 2, char, true);
            } else {
              view.setUint16(offset + i * 2, 0, true);
            }
          }
          break;

        case 'u16':
          view.setUint16(offset, value, true);
          break;
      }
    },
    get(key) {
      const { offset, type, length } = offsets[key];
      switch (type) {
        case 'utf16':
          let result = '';
          for (let i = 0; i < length; i++) {
            const charCode = view.getUint16(offset + i * 2, true);
            if (charCode !== 0) {
              result += String.fromCharCode(charCode);
            }
          }
          return result.trim();

        case 'u16':
          return view.getUint16(offset, true);
      }
    }
  };
}

const jackBlack = Structure([
  ['name', 'utf16', 10],
  ['lastName', 'utf16', 10],
  ['age', 'u16']
]);

jackBlack.set('name', 'Jack');
jackBlack.set('lastName', 'Black');
jackBlack.set('age', 53);

console.log(jackBlack.get('name')); // 'Jack'

