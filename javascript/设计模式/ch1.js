// 多态
var makeSound = function (animal) {
  animal.sound()
}

var Duck = function () {}

Duck.prototype.sound = function () {
  console.log('嘎嘎嘎')
}

var Dog = function () {}

Duck.prototype.sound = function () {
  console.log('汪汪汪')
}

makeSound(new Duck())

var renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show()
  }
}
var googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图')
  }
}
var baiduMap = {
  show: function () {
    console.log('开始渲染百度地图')
  }
}
renderMap(googleMap)