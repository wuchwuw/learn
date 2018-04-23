var event = {
  clientList: {},
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function () {
    var key = Array.prototype.shift.call(arguments)
    var fns = this.clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    for(var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  },
  remove: function (key, fn) {
    var fns = this.clientList[key]
    if (!fns) {
      return false
    }
    if (!fn) {
      fns.length = 0
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        if (fn === fns[l]) {
          fns.splice(l, 1)
        }
      }
    }
  }
}

var Event = (function () {
  var clientList = {},
      listen,
      trigger,
      remove

  listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = []
    }
    clientList[key].push(fn)
  }

  trigger = function () {
    var key = Array.prototype.shift.call(arguments)
    var fns = clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    for(var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  }

  remove = function (key, fn) {
    var fns = clientList[key]
    if (!fns) {
      return false
    }
    if (!fn) {
      fns.length = 0
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        if (fn === fns[l]) {
          fns.splice(l, 1)
        }
      }
    }
  }

  return {
    listen,
    trigger,
    remove
  }

})()

Event.listen('a', function (a, b) {
  console.log(a)
  console.log(b)
})
Event.listen('b', function (a, b) {
  console.log(a)
  console.log(b)
})
Event.trigger('a', 'haha', 'hehe')
Event.trigger('b', 'cc', 'dd')