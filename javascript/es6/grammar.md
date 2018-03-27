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

