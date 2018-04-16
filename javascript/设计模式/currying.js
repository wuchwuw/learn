// var cost = (function () {
//   var args = []
//   return function () {
//     var sum = 0
//     if (arguments.length === 0) {
//       for (var i = 0; i < args.length; i++) {
//         sum += args[i]
//       }
//       return sum
//     } else {
//       // console.log(args)
//       // console.log(arguments)
//       // args.push(arguments[0])
//       // console.log(args.push)
//       [].push.apply(args, arguments)
//     }
//   }
// })()

// cost(100, 200)
// cost(200)
// console.log(cost())

var currying = function (fn) {
  var args = []
  return function () {
    if (arguments.length === 0) {
      return fn.apply(this, args)
    } else {
      [].push.apply(args, arguments)
    }
  }
}


var cost = (function () {
  var money = 0
  return function () {
    for (var i = 0; i < arguments.length; i++) {
      money += arguments[i]
    }
    return money
  }
})()

var c = currying(cost)

c(100)
c(200)
console.log(c())