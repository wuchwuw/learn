class PriorityQueue {
  constructor () {
    this.item = []
    this.firstAdd = true
  }

  enqueue (element, priority) {
    let added = false
    if (this.firstAdd) {
      this.item.push({
        element,
        priority
      })
      this.firstAdd = false
    } else {
      for (let i = 0; i < this.item.length; i++) {
        if (this.item[i].priority > priority) {
          added = true
          this.item.splice(i, 0, {
            element,
            priority
          })
          break
        }
      }
      if (!added) {
        this.item.push({
          element,
          priority
        })
      }
    }
  }
}

let a = new PriorityQueue()
a.enqueue('11', 1)
a.enqueue('11', 3)
a.enqueue('22', 1)
console.log(a.item)