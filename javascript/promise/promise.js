function Promise(executor) {

  if (!(this instanceof Promise)) {
    return new Promise(executor)
  }
  if (typeof executor !== 'function') {
    throw new TypeError('Promise executor is not a function')
  }

  let _this = this
  _this.status = 'pending'
  _this.value = null
  _this.reason = null
  _this.onResolvedCallbacks = []
  _this.onRejectedCallbacks = []

  function resolve(value) {
    resolvePromise(_this, value, fulfill, reject)
  }

  function fulfill(value) {
    if (_this.status === 'pending') {
      _this.status = 'resolved'
      _this.value = value
      _this.onResolvedCallbacks.forEach((fn) => {
        fn()
      })
    }
  }

  function reject(reason) {
    if (_this.status === 'pending') {
      _this.status = 'rejected'
      _this.reason = reason
      _this.onRejectedCallbacks.forEach((fn) => {
        fn()
      })
    }
  }

  try {
    let called = false
    executor(function (value) {
      if(called) return
      called = true
      resolve(value)
    }, function (reason) {
      if(called) return
      called = true
      reject(reason)
    })
  } catch (e) {
    reject(e)
  }
}

function resolvePromise (promise, x, fulfill, reject) {
  if (promise === x) {
    return reject(new TypeError('循环引用了'))
  }
  if (x instanceof Promise) {
    if (x.status === 'pending') {
      x.then(function(y) {
        resolvePromise(promise, y, fulfill, reject)
      }, reject)
    } else {
      x.then(fulfill, reject)
    }
    return
  }
  let called = false
  if (x !== null && (typeof x === 'object') || typeof x === 'function') {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) return
          called = true
          resolvePromise(promise, y, fulfill, reject)
        }, (err) => {
          if (called) return
          called = true
          reject(err)
        })
      } else {
        fulfill(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
    fulfill(x)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  let _this = this
  let newPromise

  // 值穿透
  if (typeof onFulfilled !== 'function') {
    onFulfilled = function (value) {
      return value
    }
  }
  if (typeof onRejected !== 'function') {
    onRejected = function (reason) {
      throw reason // 待测试return 和 throw区别
    }
  }
  if (_this.status === 'resolved') {  // 将回调函数放入微任务队列
    newPromise = new Promise(function (resolve, reject) {
      process.nextTick(() => {
        try {
          let x = onFulfilled(_this.value)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  if (_this.status === 'rejected') {
       // 将回调函数放入微任务队列
    newPromise = new Promise(function (resolve, reject) {
      process.nextTick(() => {
        try {
          let x = onRejected(_this.reason)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  if (_this.status === 'pending') {
       // 将回调函数放入微任务队列
      newPromise = new Promise(function (resolve, reject) {
        _this.onResolvedCallbacks.push(function () {
          process.nextTick(() => {
            try {
              let x = onFulfilled(_this.value)
              resolve(x)
            } catch (e) {
              reject(e)
            }
          })
        })
        _this.onRejectedCallbacks.push(function () {
          process.nextTick(() => {
            try {
              let x = onRejected(_this.reason)
              resolve(x)
            } catch (e) {
              reject(e)
            }
          })
        })
      })
  }
  return newPromise
}

Promise.resolve = function (value) { //返回一个promise
  return new Promise(function(resolve,reject){
      resolve(value);
  })
}

Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value)
  })
}

Promise.prototype.catch = function (callback) {
  return this.then(null, callback)
}

Promise.race = function (promiseArr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i].then(resolve, reject)
    }
  })
}

Promise.all = function (promiseArr) {
  return new Promise((resolve, reject) => {
    let result = []
        time = 0;
    function promiseArr(y, i) {
      result[i] = y
      if (++time === promiseArr.length) {
        resolve(result)
      }
    }
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i].then(((y) => {
        processData(y, i)
      }), reject)
    }
  })
}

Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log)
Promise.resolve(new Error('error')).then((value)=>{
  console.log('then:', value)
}).catch((error)=>{
  console.log('catch:', error)
})

new Promise((resolve, reject) => {
  resolve({
    then:(onFulfilled,onRejected)=>{
      onFulfilled(new Promise((resolve1)=>{
        setTimeout(()=>{
          resolve1(456)
        },1000)
      }))
      onRejected(789)
    }
  })
}).then((value) => {
  console.log('fulfilled:', value)
}, (reason) => {
  console.log('rejected:', reason)
})