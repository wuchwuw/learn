function mergerSort (arr) {
  let len = arr.length
  if (len < 2) {
    return arr
  }
  let mid = parseInt(len / 2)
  return merger(mergerSort(arr.slice(0, mid)), mergerSort(arr.slice(mid)))
}

function merger (left, right) {
  let final = []
  while (left.length && right.length) {
    final.push(left[0] <= right[0] ? left.shift() : right.shift())
  }
  return final.concat(left.concat(right))
}

let arr = [1, 5, 8, 9, 0, 1, 5, 7, 9]
console.log(mergerSort(arr))

// 1589 01579
// 15 89 01 579
// 1 5 8 9 0 1 5 79
// 1 5 8 9 0 1 5 7 9
// 15 89  01 5 79
// 1589 01 579
// 1589 01579
// 011558910