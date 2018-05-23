class Node {
  constructor (key) {
    this.key = key
    this.left = null
    this.right = null
  }

  toString () {
    return `${this.key}`
  }
}

module.exports = Node