const graph = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 2, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
]

const INF = Number.MAX_SAFE_INTEGER

function dijkstra (src) {
  let dist = [],
      visited = [],
      length = graph.length

  for (let i = 0; i < length; i++) {
    dist[i] = INF
    visited[i] = false
  }
  dist[src] = 0
  for (let j = 0; j < length; j ++) {
    let u = minDistance(dist, visited)
    visited[u] = true

    for (let v = 0; v < length; v++) {
      if (!visited[v] && graph[u][v] !== 0 && dist[u] !== INF && graph[u][v] + dist[u] < dist[v]) {
        dist[v] = graph[u][v] + dist[u]
      }
    }
  }
  return dist
}

function minDistance(dist, visited) {
  let min = INF,
      minIndex = -1

  for (let i = 0; i < dist.length; i++) {
    if (!visited[i] && dist[i] <= min) {
      min = dist[i]
      minIndex = i
    }
  }
  return minIndex
}

console.log(dijkstra(0))