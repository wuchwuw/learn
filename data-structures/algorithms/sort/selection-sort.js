function selectionSort (arr) {
  let len = arr.length,
      minIndex

  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  return arr
}

let arr = [1, 5, 8, 9, 0, 1, 5, 7]
console.log(selectionSort(arr))