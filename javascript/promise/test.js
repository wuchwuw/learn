// let p = function () {
//   return new Promise((resolve, reject) => {
//     reject('reject')
//   })
// }

// p().then(() => {}, (a) => {
//   return a
// }).then((a) => {
//   console.log(a)
// })

// new Promise((resolve,reject)=>{
//   resolve(new Promise((resolve,reject)=>{
//     resolve(new Promise((resolve1)=>{
//       setTimeout(()=>{
//           resolve1(456)
//       },1000)
//     }))
//     reject(789)
//   })
// )
// }).then((value)=>{
//   console.log('success:',value)
// },(reason)=>{
//   console.log('reject:',reason)
// })
Promise.resolve(1).then(2).then(Promise.resolve()).then(console.log)