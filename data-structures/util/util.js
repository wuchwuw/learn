function defaultToString (item) {
  if (item === null) {
    return 'NULL'
  } else if (item === undefined) {
    return 'UNDEFINED'
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }
  return item.toString()
}

function defaultEquals(a, b) {
  return a === b
}

const util = {
  defaultToString,
  defaultEquals
}

module.exports = util