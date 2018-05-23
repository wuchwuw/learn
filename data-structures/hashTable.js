const LinkedList = require('./linkedList.js')
const ValuePair = require('./models/value-pair.js')
const { defaultToString } = require('./util/util.js')

class HashTable {
  constructor (toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  loseloseHashCode (key) {
    if (typeof key === 'number') {
      return key
    }
    const tableKey = this.toStrFn(key)
    let hash = 0
    for (let i of key) {
      hash += key.charCodeAt(i)
    }
    return hash % 37
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  put (key, value) {
    if (key && value) {
      let position = this.hashCode(key)
      if (this.table[position] === undefined) {
        this.table[position] = new LinkedList()
      }
      this.table[position].append(new ValuePair(key, value))
      return true
    }
    return false
  }

  get (key) {
    let item = this.table[this.hashCode(key)]
    if (item && !item.isEmpty()) {
      let current = item.getHead()
      while (current.next) {
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }
      if (current.element.key === key) {
        return current.element.value
      }
    }
    return undefined
  }

  remove (key) {
    const position = this.hashCode(key)
    const item = this.table[position]
    if (item && !item.isEmpty()) {
      let current = item.getHead()
      while (current) {
        if (current.element.key === key) {
          item.remove(current.element)
          return true
        }
        if (item.isEmpty()) {
          delete this.table[position]
        }
        current = current.next
      }
    }
    return false
  }
}

let a = new HashTable()
a.put('a', 'b')
a.put('a', 'c')
a.put('b', 'c')
console.log(a.get('a'))