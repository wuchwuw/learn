Function.prototype.before = function (fn) {
  var self = this
  return function () {
    fn(this, arguments)
    return self.apply(this, arguments)
  }
}

Function.prototype.after = function (fn) {
  var self = this
  return function () {
    console.log(self)
    var ret = self.apply(this, arguments)
    fn(this, arguments)
    return ret
  }
}

var func = function () {
  console.log(2)
}

func = func.before(function () {
  console.log(1)
}).after(function () {
  console.log(3)
})

func()