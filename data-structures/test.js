// let a = [['a', 'b'], ['c', 'd'], ['a', 'c']]
// let b = new Map(a)
// console.log(b.get('a'))
// let o = {
//   ...b,
//   [Symbol.iterator]() {
//     console.log(b)
//     return {
//       i: 0,
//       next () {
//         let keys = Object.keys(b)
//         if (this.i < keys.length) {
//           let result = { value: b[keys[this.i]], done: false}
//           this.i++
//           return result
//         } else {
//           return { value: undefined, done: true }
//         }
//       }
//     }
//   }
// }
// for (let a of o) {
//   console.log(a)
// }

var time = { a: 11 }
function a (time) {
  time = 10
  console.log(time)
}
a()
console.log(time)