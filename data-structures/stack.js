class Stack {
  constructor () {
    this.item = []
  }

  push (val) {
    this.item.push(val)
  }

  pop () {
    return this.item.pop()
  }

  isEmpty () {
    return this.item.length === 0
  }

  clear () {
    this.item = []
  }

  peek () {
    return this.item[this.item.length - 1]
  }
}

// function baseConverter(decNumber, base) {
//   var numStack = new Stack(),
//       digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E'],
//       baseString = ''

//   while(decNumber > 0) {
//     numStack.push(Math.floor(decNumber % base))
//     decNumber = Math.floor(decNumber / base)
//   }
//   while (!numStack.isEmpty()) {
//     baseString += digits[numStack.pop()]
//   }
//   console.log(baseString)
//   console.log(numStack.item)
// }

// baseConverter(10, 2)

module.exports = Stack