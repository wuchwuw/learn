function insertionSort (arr) {
  let len = arr.length
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        arr.splice(j, 0, arr[i])
        arr.splice(i + 1, 1)
        break
      }
    }
  }
  return arr
}
let arr = [1, 5, 8, 9, 0, 1, 5, 7]
console.log(insertionSort(arr))