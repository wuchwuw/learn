const { defaultEquals } = require('./util/util.js')

class Node {
  constructor (element) {
    this.element = element
    this.next = null
  }
}
class LinkedList {
  constructor () {
    this.length = 0
    this.head = null
  }
  append (element) {
    let node = new Node(element),
        current
    if (!this.head) {
      this.head = node
      console.log(node)
    } else {
      current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.length++
  }

  removeAt (position) {
    if (position > -1 && position < this.length) {
      let current = this.head,
          previous,
          index = 0
      if (position === 0) {
        this.head = current.next
      } else {
        while (index < position) {
          previous = current
          current = current.next
          index++
        }
        previous.next = current.next
      }
      this.length--
      return current.element
    } else {
      return null
    }
  }

  insert (position, element) {
    if (position > -1 && position < this.length) {
      let current = this.head
          previous,
          index = 0
          node = new Node(element)
      if (position === 0) {
        node.next = current
        this.head = node
      } else {
        while (index < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }
      this.length++
      return true
    } else {
      return false
    }
  }

  remove(element) {
    const index = this.indexOf(element)
    console.log(index)
    return this.removeAt(index)
  }

  indexOf (element) {
    let current = this.head,
        index = 0
    while (current) {
      if (defaultEquals(element, current.element)) {
        return index
      }
      current = current.next
      index++
    }
    return -1
  }

  toString () {
    let current = this.head,
        string = ''
    while (current) {
      string += current.element + (current.next ? 'n' : '')
      current = current.next
    }
    return string
  }

  isEmpty () {
    return this.length === 0
  }

  size () {
    return this.length
  }

  getHead () {
    return this.head
  }
}

module.exports = LinkedList