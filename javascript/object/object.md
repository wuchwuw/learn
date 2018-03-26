## 1.类型
### 基本类型
string number boolean null undefined object
null不是对象类型,虽然typeof null会返回object 但是null是一种基本类型。
### 复杂基本类型
array function

## 2.内建对象
String Number Boolean Object Function Array Date RegExp Error
这些内建函数都可以被用做构造器，与new操作符结合，来构建相应的子类型的对象。

    var strPrimitive = "I am a string"
    typeof strPrimitive   // 'string'
    strPrimitive instanceof String   // false

    var strObject = new String( "I am a string" )
    typeof strPrimitive   // 'object'
    strObject instanceof String  // true

通过默认的toString()方法来判断类型

    Object.prototype.toString.call( strObject );	// [object String]

访问基本类型值的属性时，javascript会自动将基本类型转换会对象类型

    var strPrimitive = "I am a string"
    console.log( strPrimitive.length )    // 13
    console.log( strPrimitive.charAt( 3 ) )  // 'm'

访问对象属性的两种形式，使用.或者[]操作符

ES6加入了 计算型属性名，在一个字面对象声明的键名称位置，你可以指定一个表达式，用[ ]括起来：

      var prefix = 'foo'
      var myObject = {
        [prefix + 'bar']: 'hello',
        [prefix + 'baz']: 'world'
      }
      myObject['foobar']; // hello
      myObject['foobaz']; // world

### 数组
试图在数组上添加一个属性，如果属性名可转化为数字，那么最终它会成为一个数字索引，会改变数组的内容和长度

    var myArray = [ 'foo', 42, 'bar' ]
    myArray['3'] = 'baz'
    myArray.length;	// 4
    myArray[3];		// 'baz'

### 复制对象

### 属性描述符
在ES5中，所有的属性都用属性描述符来描述

    var myObject = {
      a: 2
    }

    Object.getOwnPropertyDescriptor( myObject, 'a' )
    // {
    //    value: 2,
    //    writable: true,
    //    enumerable: true,
    //    configurable: true
    // }
可以使用Object.defineProperty(..)来添加新属性，或修改已经存在的属性，前提是属性是configurable的

#### 可写性(Writable)
#### 可配置性（Configurable)
注意:将configurable设置为false是一个单向操作 ，不可撤销!

configurable:false阻止的另外一个事情是使用delete操作符移除既存属性的能力
#### 可枚举性（Enumerable）
控制属性是否能在特定的对象属性枚举中出现，比如for...in
#### 不可变性（Immutability）
#### 对象常量（Object Constant）
#### 防止扩展（Prevent Extensions）
如果你想防止一个对象被添加新的属性，但另一方面保留其他既存的对象属性，调用Object.preventExtensions(..)
    var myObject = {
      a: 2
    }

    Object.preventExtensions(myObject);

    myObject.b = 3
    myObject.b // undefined

#### 封印（Seal）
Object.seal(..)创建一个“封印”的对象，这意味着它实质上在当前的对象上调用Object.preventExtensions(..)，同时也将它所有的既存属性标记为configurable:false。

所以，你既不能添加更多的属性，也不能重新配置或删除既存属性（虽然你依然 可以 修改它们的值）。

#### 冻结（Freeze）
Object.freeze(..)创建一个冻结的对象，这意味着它实质上在当前的对象上调用Object.seal(..)，同时也将它所有的“数据访问”属性设置为writable:false，所以他们的值不可改变。

#### Getters 与 Setters
ES5引入了getters和setters来覆盖对象默认的存取值操作。当你将一个属性定义为拥有getter或setter或两者兼备那么它的定义就成为了“访问器描述符”（与“数据描述符”相对）。对于访问器描述符，它的value和writable性质没有意义而被忽略，取而代之的是JS将会考虑属性的set和get性质（还有configurable和enumerable）。

#### 存在性（Existence）
我们可以查询一个对象是否拥有特定的属性，而不必取得那个属性的值：

    var myObject = {
      a: 2
    }

    ('a' in myObject)				// true
    ('b' in myObject)				// false

    myObject.hasOwnProperty('a')	// true
    myObject.hasOwnProperty('b')	// false

in操作符会检查属性是否存在于对象 中，或者是否存在于[[Prototype]]链对象遍历的更高层中（详见第五章）。相比之下，hasOwnProperty(..) 仅仅 检查myObject是否拥有属性，但 不会 查询[[Prototype]]链。

#### 枚举（Enumeration）
propertyIsEnumerable(..)测试一个给定的属性名是否直 接存 在于对象上，并且是enumerable:true。
Object.keys(..)返回一个所有可枚举属性的数组，而Object.getOwnPropertyNames(..)返回一个 所有 属性的数组，不论能不能枚举。
in和hasOwnProperty(..)区别于它们是否查询[[Prototype]]链，而Object.keys(..)和Object.getOwnPropertyNames(..)都 只 考察直接给定的对象。

#### 迭代（Iteration）

ES5还为数组加入了几个迭代帮助方法，包括forEach(..)，every(..)，和some(..)。这些帮助方法的每一个都接收一个回调函数，这个函数将施用于数组中的每一个元素，仅在如何响应回调的返回值上有所不同。

forEach(..)将会迭代数组中所有的值，并且忽略回调的返回值。every(..)会一直迭代到最后，或者 当回调返回一个false（或“falsy”）值，而some(..)会一直迭代到最后，或者 当回调返回一个true（或“truthy”）值。

你也可以使用ES6的for..of语法，在数据结构（数组，对象等）中迭代 值，它寻找一个内建或自定义的@@iterator对象，这个对象由一个next()方法组成，通过这个next()方法每次迭代一个数据。


## 3.原型

当我们调用对象上的属性时，对于默认的[[Get]]操作来说，第一步就是检查对象本身是否拥有这个属性，如果有，就使用它。如果没有就沿着对象的原型链向上查找，直到找到匹配名称的属性，如果在链条的末尾都没有找到匹配的属性，那么[[Get]]操作的返回结果为undefined。

    var anotherObject = {
      a: 2
    }
    // 创建一个链接到`anotherObject`的对象
    var myObject = Object.create(anotherObject)
    myObject.a // 2

在这个例子中，我们现在让myObject[[Prototype]]链到了anotherObject。虽然很明显myObject.a实际上不存在，但是无论如何属性访问成功了（在anotherObject中找到了），而且确实找到了值2。但是，如果在anotherObject上也没有找到a，而且如果它的[[Prototype]]链不为空，就沿着它继续查找。

### 设置与遮蔽属性

当我们在对象上添加新属性，或者改变即存属性的值时，会有以下几种情况

例如：

    myObject.foo = "bar";

1、如果对象myObject已经存在名为foo的数据访问器属性，那么这个赋值就和改变既存属性的值一样简单。

2、foo还没有直接存在于myObject，[[Prototype]]就会被遍历，就像[[Get]]操作那样。如果在链条的任何地方都没有找到foo，那么就会像我们期望的那样，属性foo就以指定的值被直接添加到myObject上。

3、如果foo同时存在于myObject和从myObject开始的[[Prototype]]链的更高层，这样的情况称为 遮蔽。直接存在于myObject上的foo属性会 遮蔽任何出现在链条高层的foo属性，因为myObject.foo查询总是在寻找链条最底层的foo属性。

4、当foo不直接存在于myObject，但存在于myObject的[[Prototype]]链的更高层
(1)如果一个普通的名为foo的数据访问属性在[[Prototype]]链的高层某处被找到，而且没有被标记为只读（writable:false），那么一个名为foo的新属性就直接添加到myObject上，形成一个遮蔽属性。
(2)如果一个foo在[[Prototype]]链的高层某处被找到，但是它被标记为只读（writable:false） ，那么设置既存属性和在myObject上创建遮蔽属性都是不允许的。如果代码运行在strict mode下，一个错误会被抛出。否则，这个设置属性值的操作会被无声地忽略。不论怎样，没有发生遮蔽。
(3)如果一个foo在[[Prototype]]链的高层某处被找到，而且它是一个setter（见第三章），那么这个setter总是被调用。没有foo会被添加到（也就是遮蔽在）myObject上，这个foo setter也不会被重定义。

与其说js是面向对象，倒不如说是面向委托的设计。它并不像传统面向对象语言那样，通过拷贝类来生成实例，进而得到类上面定义的属性和方法。而是通过原型链来委托对象的属性，当一个属性/方法引用在第一个对象上发生，而这样的属性/方法又不存在时，引擎就会往原型链上继续查找。

与其他面向对象语言类似的是，js也使用new关键字来生成一个实例，尽管它并不是拷贝对象的属性，而是通过在两个对象之间建立链接。

例如：

    var foo = {
	  something: function() {
	    console.log( "Tell me something good..." );
	  }
    }

    var bar = Object.create(foo);

    bar.something(); // Tell me something good...

上面的例子通过 var bar = Object.create(foo) 来将bar和foo链接起来，所以即使bar对象上没有something这个方法，也可以通过查找[[Prototype]]链找到foo.something。

相比于直接用new来链接两个对象，使用Object.create方法能使链接更加纯粹，副作用更少，而Object.create方法的本质，也是通过new来建立链接
    if (!Object.create) {
        Object.create = function(o) {
            function F(){}
            F.prototype = o;
            return new F();
        };
    }


### 原型继承

这里是一段典型的创建这样的链接的“原型风格”代码：

    function Foo(name) {
	this.name = name;
    }

    Foo.prototype.myName = function() {
        return this.name;
    };

    function Bar(name,label) {
        Foo.call( this, name );
        this.label = label;
    }

    // 这里，我们创建一个新的`Bar.prototype`链接链到`Foo.prototype`
    Bar.prototype = Object.create( Foo.prototype );

    // 注意！现在`Bar.prototype.constructor`不存在了，
    // 如果你有依赖这个属性的习惯的话，可以被手动“修复”。

    Bar.prototype.myLabel = function() {
        return this.label;
    };

    var a = new Bar( "a", "obj a" );

    a.myName(); // "a"
    a.myLabel(); // "obj a"

通过new Bar 使得a与Bar.prototype建立链接, 通过Object.create( Foo.prototype ) 使
得Bar.prototype与Foo.prototype建立链接

