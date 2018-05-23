const Graph = require('../graph')
const Queue = require('../queue')
const Stack = require('../stack')

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
}

const initializeColor = vertices => {
  const color = {}
  vertices.forEach(item => {
    color[item] = Colors.WHITE
  })
  return color
}

// 广度优先
function BFS (graph, startVertex, cb) {
  let vertices = graph.getVertices()
  let adjList = graph.getAdjList()
  let color = initializeColor(vertices)

  // 存储灰色节点队列
  let quene = new Quene()

  while (!quene.isEmpty()) {
    let u = quene.dequeue()
    let neighbors = adjList.get(u)
    color[u] = Colors.GREY

    neighbors.forEach(item => {
      if (color[item] === Colors.WHITE) {
        color[item] = Colors.GREY
        quene.enqueue(item)
      }
    })
    color[u] = Colors.BLACK
    cb && cb(u)
  }
}

// 最短路径
function shotestPath (graph, startVertex) {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  let color = initializeColor(vertices)
  let queue = new Queue()
  let distances = {}
  let predecessors = {}
  queue.enqueue(startVertex)

  vertices.forEach(item => {
    distances[item] = 0
    predecessors[item] = null
  })

  while(!queue.isEmpty()) {
    let u = queue.dequeue()
    let neighbors = adjList.get(u)
    color[u] = Colors.GREY
    neighbors.forEach(item => {
      if (color[item] === Colors.WHITE) {
        distances[item] = distances[u] + 1
        predecessors[item] = u
        color[item] = Colors.GREY
        queue.enqueue(item)
      }
    })
    color[u] = Colors.BLACK
  }
  return {
    distances,
    predecessors
  }
}

// 构建路径

function path (graph, predecessors) {
  let vertices = graph.getVertices()
  let fromV = 'A'
  for (let i = 1; i < vertices.length; i++) {
    let toV = vertices[i]
    let path = new Stack()
    for (let v = toV; v !== fromV; v = predecessors[v]) {
      path.push(v)
    }
    path.push(fromV)
    let s = path.pop()
    while(!path.isEmpty()) {
      s += '-' + path.pop()
    }
    console.log(s)
  }
}

let g = new Graph()
let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
arr.forEach((item) => {
  g.addVertex(item)
})
g.addEdge('A', 'B')
g.addEdge('A', 'C')
g.addEdge('A', 'D')
g.addEdge('C', 'D')
g.addEdge('C', 'G')
g.addEdge('D', 'G')
g.addEdge('D', 'H')
g.addEdge('B', 'E')
g.addEdge('B', 'F')
g.addEdge('E', 'I')
console.log(g)
let b = shotestPath(g, 'A')
path(g, b.predecessors)