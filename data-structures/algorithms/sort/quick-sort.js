// function quickSort (arr) {
//   let len = arr.length
//   let left = []
//   let right = []
//   let mid = [arr[0]]
//   if (len <= 1) {
//     return arr
//   }
//   for (let i = 1; i < len; i++) {
//     if (arr[i] <= arr[0]) {
//       left.push(arr[i])
//     } else {
//       right.push(arr[i])
//     }
//   }
//   return quickSort(left).concat(mid.concat(quickSort(right)))
// }

// let arr = [1, 5, 8, 9, 0, 1, 5, 7]
// console.log(quickSort(arr))

// 另个一版本 不开新数组 交换

function quickSort (arr, left, right) {
  let len = arr.length
  let index
  if (len > 1) {
    index = partition(arr, left, right)
    if (left < index - 1) {
      quickSort(arr, left, index - 1)
    }
    if (right > index) {
      quickSort(arr, index, right)
    }
  }
  return arr
}

function partition (arr, left, right) {
  let pivot = arr[Math.floor((right + left) / 2)],
      i = left,
      j = right

  while (i <= j) {
    while (arr[i] < pivot) {
      i++
    }
    while (arr[j] > pivot) {
      j--
    }

    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i++
      j--
    }
  }
  return i
}

let arr = [1, 5, 8, 9, 10, 6, 0, 1, 5, 7]
console.log(quickSort(arr, 0, 9))