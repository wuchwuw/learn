var debounce = function (fn, interval) {
  var self = fn,
      timer = null
  return function () {
    var me = this,
        args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      self.apply(this, args)
    }, 500 || interval)
  }
}
window.name = 'b'
var a = debounce(function () {
  console.log(this.name)
}, 1000)

var o = {
  name: 'a',
  a: a
}
o.a()
o.a()
o.a()
o.a()
o.a()
o.a()