function binarySearch(arr, item) {
  let low = 0,
      height = arr.length - 1,
      mid

  while (low <= height) {
    mid = Math.floor((low + height) / 2)
    if (arr[mid] === item) {
      return mid
    } else if (arr[mid] < item) {
      low = mid + 1
    } else {
      height = mid - 1
    }
  }
  return -1
}

let arr = [1, 2, 4, 5, 7, 8]
console.log(binarySearch(arr, 10))