class Node {
  constructor (element) {
    this.element = element
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  constructor () {
    this.length = 0,
    this.head = null,
    this.tail = null
  }

  insert (position, element) {
    if (position > -1 && position < this.length) {
      let current = this.head,
          previous,
          node = new Node(element)
      if (position === 0) {
        if (!this.head) {
          this.head = node
          this.tail = node
        } else {
          current.prev = node
          node.next = current
          this.head = node
        }
      } else if (position === length) {
        node.prev = tail
        this.tail.next = node
        this.tail = node
      } else {
          while (index < position) {
            previous = current
            current = current.next
          }
          node.prev = previous
          node.next = current
          previous.next = node
          current.prev = node
      }
      this.lenth++
      return true
    } else {
      return false
    }
  }

  removeAt (position) {
    if (position > -1 && position < this.length) {
      let current = this.head,
          previous,
          index = 0
      if (position === 0) {
        this.head = current.next
        if (this.length === 1) {
          this.tail = null
        } else {
          this.head.prev = null
        }
      } else if (position === this.length - 1) {
        this.tail = this.tail.prev
        this.tail.next = null
      } else {
        while (index < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
        current.next.prev = previous
      }
      this.length--
      return current.element
    } else {
      return null
    }
  }
}