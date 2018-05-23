const Stack = require('../stack')
const Graph = require('../graph')
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

// dfs 栈
// function dfs (g) {
//   let vertices = g.getVertices()
//   let adjList = g.getAdjList()
//   let color = initializeColor(vertices)
//   let fromV = vertices[5]
//   let stack = new Stack()
//   stack.push(fromV)
//   color[fromV] = Colors.GREY
//   while(!stack.isEmpty()) {
//     let v = stack.peek()
//     let near = adjList.get(v)
//     let isAdded = false
//     for (let i = 0; i < near.length; i++) {
//       if (color[near[i]] === Colors.WHITE) {
//         stack.push(near[i])
//         color[near[i]] = Colors.GREY
//         console.log(near[i])
//         isAdded = true
//         break
//       }
//     }
//     if (!isAdded) {
//       stack.pop(v)
//     }
//   }
// }

// dfs 递归
function dfs (g, cb) {
  let vertices = g.getVertices(),
      color = initializeColor(vertices)
      d = [], // 发现时间
      f = [], // 完成时间
      p = []  // 前溯点
      time = { count: 0 }
  vertices.forEach(item => {
    if (color[item] === Colors.WHITE) {
      dfsVisit(item, g, color, d, f, p, time, cb)
    }
  })
  return {
    discovery: d,
    finished: f,
    predecessors: p
  }
}

function dfsVisit(v, g, color, d, f, p, time, cb) {
  color[v] = Colors.GREY
  d[v] = ++time.count
  cb && cb(v)
  let near = g.getAdjList().get(v)
  for(let i = 0; i < near.length; i++) {
    if (color[near[i]] === Colors.WHITE) {
      p[near[i]] = v
      dfsVisit(near[i], g, color, d, f, p, time, cb)
    }
  }
  f[v] = ++time.count
}

// let g = new Graph()
// let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
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
// console.log(g.getAdjList())
// let result = dfs(g, (v) => {
//   console.log(v)
// })

let g = new Graph(true)
let arr = ['A', 'B', 'C', 'D', 'E', 'F']
arr.forEach((item) => {
  g.addVertex(item)
})
g.addEdge('A', 'C')
g.addEdge('A', 'D')
g.addEdge('B', 'D')
g.addEdge('B', 'E')
g.addEdge('C', 'F')
g.addEdge('F', 'E')
console.log(dfs(g))
let result = dfs(g).finished
result.sort((a, b) => {
  console.log(a)
  return a - b
})
console.log(result)
