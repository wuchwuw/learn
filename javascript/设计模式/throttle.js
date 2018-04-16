var throttle  = function (fn, interval) {
  var timer = null, first = true, self = fn
  return function () {
    var args = arguments
        me = this
    if (first) {
      self.apply(me, args)
      first = false
    }

    if (timer) {
      return false
    }

    timer = setTimeout(function () {
      clearTimeout(timer)
      timer = null
      self.apply(me, args)
    }, interval || 500)
  }
}
var a = throttle(function() {
  console.log(1)
}, 2000)

setInterval(function () {
  a()
}, 100)