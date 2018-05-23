function heapSort (array) {
  let heapSize = array.length
  let result = []
  buildMaxHeap(array)
  while (heapSize > 1) {
    result.push(array[0])
    heapSize--
    [array[0], array[heapSize]] = [array[heapSize], array[0]]
    maxHeapify(array, 0, heapSize)
  }
  result.push(array[0])
  return result
}

function maxHeapify (array, index, heapSize) {
  let max = index,
      left = 2 * index + 1,
      right = 2 * index + 2

  if (left < heapSize && array[max] < array[left]) {
    max = left
  }
  if (right < heapSize && array[max] < array[right]) {
    max = right
  }
  if (index !== max) {
    [array[index], array[max]] = [array[max], array[index]]
    maxHeapify(array, max, heapSize)
  }
}

function buildMaxHeap (array) {
  // 算出父节点个数，遍历调用maxHeapify 构建最大堆
  let parentNum = Math.floor(array.length / 2)
  for (let i = parentNum; i >= 0; i--) {
    maxHeapify(array, i, array.length)
  }
}

let arr = [1, 5, 8, 9, 0, 1, 5, 7]
console.log(heapSort(arr))