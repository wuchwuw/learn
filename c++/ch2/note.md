##2.4
### const
1、创建后不可改变，必须初始化。

2、在文件内有效，不过使用extern关键字加以限定可以被其他文件使用。

    extern const int bufSize = 512;

#### 2.4.1 引用和const

1、常量引用的类型可以与其引用的对象不同，例：

    const dval = 3.14;
    const int &ri = dval;

通过绑定一个临时量对象来实现转换，例:

    const int temp = dval;
    const int &ri = temp;

2、不允许通过常量引用来修改被引用对象的值

#### 2.4.2 指针和const

1、允许指向常量的指针指向非常量对象

2、不允许通过指向常量的指针来修改被指向对象的值

3、定义一个指向常量对象的常量指针

    const double pi = 3.14
    const double *const pip = &pi

4、允许一个常量指针去改变一个非常量的一般对象

#### 2.4.3 顶层const

