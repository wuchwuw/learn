var getSingle = function (fn) {
  var ret
  return function () {
    return ret || (ret = fn.apply(this.args))
  }
}