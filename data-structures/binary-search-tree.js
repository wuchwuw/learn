const Node = require('./models/node.js')

class BinarySearchTree {
  constructor () {
    this.rootNode = null
  }

  static insertNode (node, newNode) {
    if (node.key === newNode.key) {
      return
    }
    if (node.key > newNode.key) {
      if (!node.left) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (!node.right) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  insert (key) {
    let newNode = new Node(key)
    if (!this.rootNode) {
      this.rootNode = newNode
    } else {
      BinarySearchTree.insertNode(this.rootNode, newNode)
    }
  }

  static inOrderTraverseNode (node, callback) {
    if (node) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  static preOrderTraverseNode (node, callback) {
    if (node) {
      callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  static postOrderTraverseNode (node, callback) {
    if (node) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }

  inOrderTraverse (callback) {
    BinarySearchTree.inOrderTraverseNode(this.rootNode, callback)
  }

  preOrderTraverse (callback) {
    BinarySearchTree.preOrderTraverseNode(this.rootNode, callback)
  }

  postOrderTraverse (callback) {
    BinarySearchTree.postOrderTraverseNode(this.rootNode, callback)
  }

  static minNode (node) {
    if (!node) {
      return undefined
    }
    while (node.left) {
      node = node.left
    }
    return node.key
  }

  static maxNode (node) {
    if (!node) {
      return undefined
    }
    while (node.right) {
      node = node.right
    }
    return node.key
  }

  min () {
    return BinarySearchTree.minNode(this.rootNode)
  }

  max () {
    return BinarySearchTree.maxNode(this.rootNode)
  }

  static searchNode (node, key) {
    if (!node) {
      return false
    }
    if (key < node.key) {
      return this.searchNode(node.left, key)
    } else if (key > node.key) {
      return this.searchNode(node.right, key)
    }
    return true
  }

  search (key) {
    return BinarySearchTree.searchNode(this.rootNode, key)
  }
}

let a = new BinarySearchTree()
let arr = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25, 6]
arr.forEach(item => {
  a.insert(item)
})
// a.postOrderTraverse((value) => {
//   console.log(value)
// })
console.log(a.search(30))
console.log(a.max())