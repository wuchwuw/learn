const INF = Number.MAX_SAFE_INTEGER

const graph = [
  [0, 2, 6, 4],
  [INF, 0, 3, INF],
  [7, INF, 0, 1],
  [5, INF, 12, 0]
]

function floyd () {
  let dist = [],
      length = graph.length

  for (let i = 0; i < length; i++) {
    dist[i] = []
    for (let j = 0; j < length; j++) {
      dist[i][j] = graph[i][j]
    }
  }

  for (let k = 0; k < length; k++) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j]
        }
      }
    }
  }
  return dist
}

console.log(floyd())