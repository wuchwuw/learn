Function.prototype.uncurrying = function () {
  var self = this
  return function () {
    var o = Array.prototype.shift.apply(arguments)
    return self.apply(o, arguments)
  }
}

var push = Array.prototype.push.uncurrying()

(function () {
  push(arguments, 4)
  console.log(arguments)
})(1, 2, 3)