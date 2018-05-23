class Graph {
  constructor (isDirected = false) {
    this.isDirected = isDirected
    this.vertices = []
    this.adjList = new Map()
  }

  addVertex (v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.adjList.set(v, [])
    }
  }

  addEdge(a, b) {
    if (!this.adjList.get(a)) {
      this.addVertex(a)
    }
    if (!this.adjList.get(b)) {
      this.addVertex(b)
    }
    this.adjList.get(a).push(b)
    if (!this.isDirected) {
      this.adjList.get(b).push(a)
    }
  }

  getVertices () {
    return this.vertices
  }

  getAdjList () {
    return this.adjList
  }
}

module.exports = Graph

// let g = new Graph()
// let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
// arr.forEach((item) => {
//   g.addVertex(item)
// })
// g.addEdge('A', 'B')
// g.addEdge('A', 'C')
// g.addEdge('A', 'D')
// g.addEdge('C', 'D')
// g.addEdge('C', 'G')
// g.addEdge('D', 'G')
// g.addEdge('D', 'H')
// g.addEdge('B', 'E')
// g.addEdge('B', 'F')
// g.addEdge('E', 'I')
// console.log(g)