## es6语法
### 块作用域
#### let

    var a = 2;

    {
      let a = 3;
      console.log( a );	// 3
    }

    console.log( a );

与var的区别: 没有变量提升，绑定到块作用域上

#### const

声明一个常量，并禁止赋值操作

    {
      const a = 2;
      console.log( a );	// 2

      a = 3;				// TypeError!
    }

如果这个值是一个复杂值，比如对象或数组，那么这个值的内容仍然是可以被修改的：

    {
      const a = [1,2,3];
      a.push( 4 );
      console.log( a );		// [1,2,3,4]

      a = 42;					// TypeError!
    }

变量a实际上没有持有一个恒定的数组；而是持有一个指向数组的恒定的引用。数组本身可以自由变化。

警告： 将一个对象或数组作为常量赋值意味着这个值在常量的词法作用域消失以前是不能够被垃圾回收的，因为指向这个值的引用是永远不能解除的。这可能是你期望的，但如果不是你就要小心！


#### 块作用域的函数

避免在块作用域内定义函数。。

    {
      foo();					// 好用！

      function foo() {
        // ..
      }
    }

    foo();						// ReferenceError


#### 扩散/剩余(...操作符)

#### 默认参数值

function foo(x = 11, y = 31) {
	console.log( x + y );
}

foo();					// 42
foo( 5, 6 );			// 11
foo( 0, 42 );			// 42

foo( 5 );				// 36
foo( 5, undefined );	// 36 <-- `undefined`是缺失
foo( 5, null );			// 5  <-- null强制转换为`0`

foo( undefined, 6 );	// 17 <-- `undefined`是缺失
foo( null, 6 );			// 6  <-- null强制转换为`0`

忽略或值等于undefined时，使用默认参数

一个默认值表达式中的标识符引用会在首先在正式参数的作用域中查找标识符，然后再查找一个外部作用域。

    var w = 1, z = 2;
    function foo( x = w + 1, y = x + 1, z = z + 1 ) {
      console.log( x, y, z );
    }
    foo();					// ReferenceError

#### 解构赋值

    var [ a, b, c ] = foo();
    var { x: x, y: y, z: z } = bar();

    console.log( a, b, c );				// 1 2 3
    console.log( x, y, z );

#### 对象字面量扩展

    var x = 2, y = 3,
    o = {
      x,
      y
    };

    var o = {
      x() {
        // ..
      },
      y() {
        // ..
      }
    }

#### 设置[[Prototype]]

有时候在你声明对象字面量的同时给它的[[Prototype]]赋值很有用。下面的代码在一段时期内曾经是许多JS引擎的一种非标准扩展，但是在ES6中得到了标准化：

    var o1 = {
      // ..
    };

    var o2 = {
      __proto__: o1,
      // ..
    };

对于给一个既存的对象设置[[Prototype]]，你可以使用ES6的工具Object.setPrototypeOf(..)。考虑如下代码：

    var o1 = {
      // ..
    };

    var o2 = {
      // ..
    };

    Object.setPrototypeOf( o2, o1 );

#### 对象super

    var o1 = {
      foo() {
        console.log( "o1:foo" );
      }
    };

    var o2 = {
      foo() {
        super.foo();
        console.log( "o2:foo" );
      }
    };

    Object.setPrototypeOf( o2, o1 );

    o2.foo();		// o1:foo
                // o2:foo

警告： super仅在简约方法中允许使用，而不允许在普通的函数表达式属性中。而且它还仅允许使用super.XXX形式（属性/方法访问），而不是super()形式。


#### 模板字面量

    var name = "Kyle";

    var greeting = `Hello ${name}!`;

    console.log( greeting );			// "Hello Kyle!"
    console.log( typeof greeting );		// "string"

#### 箭头函数

#### for..of循环

    for (var val of a) {
      console.log( val );
    }
    // "a" "b" "c" "d" "e"

在JavaScript标准的内建值中，默认为可迭代对象的（或提供可迭代能力的）有：

数组
字符串
Generators（见第三章）
集合/类型化数组（见第五章）

#### Unicode

#### Symbols