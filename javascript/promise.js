function Promise(fn) {
  var value = null,
      cbs = [],
      state = 'pending'
  this.then = function (onFulFilled) {
    if (state === 'pending') {
      cbs.push(onFulFilled)
      return this
    }
    onFulfilled(value)
    return this
  }
  function resolve(value) {
    setTimeout(() => {
      cbs.forEach((cb) => {
        cb(value)
      })
    }, 0)
  }
  fn(resolve)
}

function a() {
  return new Promise(function(resolve) {
    // setTimeout(() => {
    //   var b = 'resolve'
    //   resolve(b)
    // }, 1000)
    var b = 'resolve'
    resolve(b)
  })
}

a()
  .then((c) => {
    return c
  })
  .then((c) => {
    return new Promise((resolve) => {
      var b = '...'
      resove(b)
    })
  })
  .then(b => {
    ...
  })
