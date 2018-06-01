let p = function () {
  return new Promise((resolve, reject) => {
    reject('reject')
  })
}

p().then(() => {}, (a) => {
  return a
}).then((a) => {
  console.log(a)
})