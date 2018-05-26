## 函数

### 默认参数值

在es5中使用默认参数值

    function a (b) {
      b = (typeof b !== 'undefined') ? b : 'xx'
    }

在es6中使用默认参数值

    function a (b = 'xx') {
      ...
    }

### 默认参数值影响arguments对象

在ES5的非严格模式下,arguments对象会根据具名参数的变化而变化,而在严格模式下具名参数的变化不会改变arguments对象
ES6与ES5严格模式下的表现一致。不过在ES6中，参数的默认值触发了arguments对象与具名参数的分离。

    function a (b, c = 'cc') {
      console.log(arguments.length) 1
      console.log(b === arguments[0])
      console.log(c === arguments[1])
      b = 'bbb'
      c = 'ccc'
      console.log(b === arguments[0]) // false
      console.log(c === arguments[1]) // false
    }
    a(1, 2)

### 参数默认值表达式
仅在add被调用,并且未提供第二个参数时，getValue被调用

    function getValue () {
      ...
    }
    function add (first, second = getValue()) {
      ...
    }

使用前面的参数作为后面参数的默认值

    function add (first, second = first) {}


### 剩余参数
使用...操作符来获取函数的剩余参数,函数只能有一个剩余参数，而且必须放在参数的最后面。

    function a (a, ...b) {
      console.log(b)
    }
    a(1, 2, 3, 4, 5) // [2, 3, 4, 5]

剩余参数不能再对象字面量的setter属性中使用,setter只能使用单个参数。

    let o = {
      set name (...value) {
        ...
      }
    }  // Uncaught SyntaxError: Setter function argument must not be a rest parameter

### 函数构造器的增强能力

为Function 构造器函数传递字符串来动态创建一个新函数

    let add = new Function('first', 'second', 'return first + second')
    console.log(add(1, 2)) // 3

### new.target

在ES5中判断构造函数是否通过new调用通常是通过以下方法实现

    function F (name) {
      if (this instanceof F) {
        ...
      }
    }

用上述方法有一定的缺陷,例如: 
通过call来调用改变F中this的指向

    let f1 = new F('name')
    let f2 = F.call(f1, 'name')

为了区分上述情况，ES6中加入了new.target元属性，元属性指的是"非对象"上的属性，
当函数的通过new调用，也就是函数的[[constructor]]方法被被调用时，new.target的值为new运算符的作用目标，
否则为undefined。

    function F (name) {
      if (typeof new.target !== 'undefined') {
        this.name = name
      } else {
        throw new Error('xx')
      }
    }

    let f1 = new F()
    let f2 = F.call(f1)  // 报错

### 块级函数

ES6严格模式中创建块级函数会被提升到所在代码块的顶部，而非严格模式下会被提升到所在函数或者全局环境的顶部

### 箭头函数

没有this、super、arguments、new.target绑定
不能被new调用
没有原型
不能更改this
没有arguments对象
不允许重复的具名参数

箭头函数的this指向函数定义时的上下文

### 尾递归优化

ES6严格模式下，满足以下条件,可以保持更小的调用栈、使用更少的内存、并防止堆栈溢出:

1、尾调用不能引用当前栈帧中的变量（函数不能是闭包）
2、在尾调用返回结果后不能做额外操作
3、尾调用的结果作为当前函数的返回值