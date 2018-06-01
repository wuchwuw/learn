function Promise(executor) {
  let _this = this
  _this.status = 'pending'
  _this.value = null
  _this.reason = null
  _this.onFulfilledCallbacks = []
  _this.onRejectedCallbacks = []

  function resolve(value) {
    if (_this.status === 'pending') {
      _this.status = 'fulfilled'
      _this.value = value
      _this.onFulfilledCallbacks.forEach((fn) => {
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

  if (!(this instanceof Promise)) {
    return new Promise(executor)
  }
  if (typeof executor !== 'function') {
    throw new TypeError('Promise executor is not a function')
  }
  try {
    executor(function (value) {
      resolve(value)
    }, function (reason) {
      reject(reason)
    })
  } catch (e) {
    reject(e)
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
  if (_this.status === 'fulfilled') {
    newPromise = new Promise(function (resolve, reject) {
      try {
        let x = onFulfilled(_this.value)
        resolve(x)
      } catch (e) {
        reject(e)
      }
    })
  }
  if (_this.status === 'rejected') {
    newPromise = new Promise(function (resolve, reject) {
      try {
        let x = onRejected(_this.reason)
        resolve(x)
      } catch (e) {
        reject(e)
      }
    })
  }
  if (_this.status === 'pending') {
    newPromise = new Promise(function (resolve, reject) {
      _this.onFulfilledCallbacks.push(function () {
        try {
          let x = onFulfilled(_this.value)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
      _this.onRejectedCallbacks.push(function () {
        try {
          let x = onRejected(_this.reason)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  return newPromise
}

// test
// var promise = new Promise((resolve, reject) => {
//   setTimeout(function () {
//     resolve('test simplePromise resolve')
//   }, 1000)
// })
// promise.then(function (value) {
//   console.log('success:', value)
//   return value
// }, function (reason) {
//   console.log('failed:', reason)
// })
// .then(function (value) {
//   console.log('then2', value)
// })
// let promise1 = new Promise((resolve,reject) => {
//   throw new Error('error')
// })
// promise1.then((value)=>{
//   console.log('success:',value)
// },(reason)=>{
//   console.log('reject:',reason)
// })
new Promise((resolve,reject)=>{
  resolve(1)
}).then().then().then((value)=>{
  console.log(value)
},(reason)=>{console.log('reject:', reason)})