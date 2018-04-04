## 3 字符串、向量和数组
### 3.1 命名空间的using声明

1、使用了命名空间的using声明，就可以直接访问命名空间中的名字
2、需要为每个引入的成员都添加using声明
3、头文件不应包含using声明

    using std::cin;
    using std::cont;
    ...
    cin >> i;
    cont << i;

### 3.2 标准库类型string

1、引入

    #include <string>
    using std::string;

#### 3.2.1 定义和初始化string对象

直接初始化

    string s("hahaha")

拷贝初始化

    string s = 'hehehe'

#### 3.2.2 string对象上的操作

<< >> getline empty size + = == != < <= > >=

1、使用IO操作读写string对象，会忽略空白(空格符、换行符、制表符等)

2、读取未知数量的string对象

    while (cin >> word)
      cout << word << endl;  // 逐个输出单词，每个单词后面紧跟一个换行

3、使用getline读取一整行，得到的string对象中不包含换行符

    while (getline(cin, line))
      cout << line << endl;  // 每次读入一整行，直至到达文件末尾

4、empty\size

    line.empty() // 是否返回空
    line.size() // 返回string对象的长度

5、string::size_type类型

    auto len = line.size(); // len的类型是string::size_type， 无符号

6、比较string对象

    对应字符相同，长的大
    对应字符不同，比较第一对相异字符

7、string对象相加，确保每个加法运算符的两侧的运算对象至少有一个是string
  (在c++中，字符串字面值和string是不同的类型)

    string s1 = "hello";
    string s2 = "world";

    string s = s1 + s2
    string s = s1 + "," + s2
    string s = "hello" + "," + s2 // 错误

#### 3.2.3 处理string对象中的字符

1、cctype头文件中的函数..

2、范围for

    for (auto c : str)
      cout << c << endl;

改变字符串中的字符

    for (auto &c : str)
      c = toupper(c)
    cout << s << endl;

使用下标进行迭代

    for (decltype(s.size()) index = 0;
        index != s.size() && !isspace(s[index]); ++index)
        s[index] = toupper(s[index])

### 3.3 标准库类型vector

1、引入头文件、using声明

    #include <vector>
    using std::vector;
    // 定义
    vector<int> ivec;
    vector<Sales_item> Sales_vec;
    vector<vector<string>> file;

#### 3.3.1 定义和初始化vector对象

    vector<T> v1
    vector<T> v1(v2) // vector<T> v1 = v2
    vector<T> v3(n, val)
    vector<T> v4(n)
    vector<T> v5{a, b, c, d}  // vector<T> v5 = {a, b, c, d}

    vector<string> s{10} // 无法执行列表初始化，编译器尝试用默认值初始化对象

#### 3.3.2 向vector对象中添加元素

1、不清楚元素个数、或者元素个数很多时，使用push_back方法来添加元素

    vector<int> v2;
    for (int i = 0; i != 100; ++i)
      v2.push_back(i)

    string word;
    vector<string> text;
    while(cin >> word)
      text.push_back(word)

2、vector对象的其他操作

    empty size push_back [] = == != < <= > >=

使用vector的size_type

    vector<int>::size_type // 正确
    vector::size_type // 错误

不能用下标形式添加元素(string对象也是),但是可以通过下标修改已拥有的元素

### 3.4 迭代器介绍

#### 3.4.1 使用迭代器

### 3.5 数组

#### 3.5.1 定义和初始化数组

1、维度必须是一个常量表达式

    string strs[get_size()]; // 当get_size()是常量表达式时正确
    int arr[10];
    unsigned cnt = 42;
    string bad[cnt]; // 错误

    constexpr unsigned sz = 42;
    int *parr[sz]; // 正确

2、显示初始化

    const unsigned sz = 3;
    int ial[sz] = {0, 1, 2}
    int a2[] = {0, 1, 2}
    string a4[3] = {"hi", "bey"}  // "hi" "bey" ""

    char a[] = "C++" // 维度4

3、不允许拷贝和赋值

    int a[] = {0, 1, 2};
    int a2[] = a;  // 错误
    a2 = a; // 错误

4、数组声明

    int *ptrs[10]; // 含有10个整数型指针的数组
    int &refs[10] =  // 错误，不存在引用的数组
    int (*parray)[10] = &arr // 指向含有10个整数的数组的指针
    int (&arrRef)[10] = arr // 引用一个含有10个整数的数组

#### 3.5.2 访问数组元素

    cstddef头文件中定义了size_t类型

#### 3.5.3 指针和数组

1、在很多用到数组名字的地方，编译器都会自动的将其替换为一个指向数组首元素的指针

    string *p = nums; // 等价于 string p = &nums[0]

2、指针也是迭代器，迭代器支持的运算，数组指针也支持

    int *p = arr; // p指向arr的第一个元素
    ++p;  // p指向arr[1]

3、标准库函数begin和end

    int a[] = {...}
    int *beg = begin(a);
    int *last = end(a)

4、指针相减，ptrdiff_t带符号类型

5、解引用和指针运算的交互

    int a[] = {0, 2, 4, 6, 8}
    int last = *(a + 4) // 8

    last = *a + 4 // 4

6、下标和指针

    int ia[] = {0, 2, 4, 6, 8};
    int i = ia[2]; // (ia + 2)
    int *p = ia;
    i = *(p + 2); // 等价于i = ia[2]

 #### 3.5. c风格字符串

1、c标准库函数

2、c++ c风格字符串比较
    string s1 = "...";
    string s2 = "...";
    if (s1 > s2) ..  // 正确比较
    const char ca1[] = "...";
    const char ca2[] = "...";
    if (ca1 > ca2) // 错误,实际比较的是const char*的值，并非指向同一对象
    if (stccmp(ca1, ca2)) // 使用标准库函数进行比较

3、混用string对象和c风格字符串

    char *str = s; // 错误，
    const char *str = s.c_str();

4、使用数组初始化vector对象

    int int_arr[] = {0, 1, 3, 4, 5};
    vector<int> ivect(begin(int_arr), end(int_arr));

### 3.6多维数组

1、多维数组初始化

    int ia[3][4] = {
      {0, 1, 2, 3},
      {4, 5, 6, 7},
      {8, 9, 10, 11}
    }

    int ia[3][4] = {0, 1, 2, 3, ....}

初始化每行首元素

    int ia[3][4] = {{0}, {4}, {8}

2、 多维数组的下标引用

    ia[2][3] = arr[0][0][0];
    int (&row)[4] = ia[1]

    constexpr size_t rowCnt = 3, colCnt = 4;
    int ia[rowCnt][colCnt];
    for (size_t i = 0; i != rowCnt; ++i)
        for (size_t j = 0; j != colCntl; ++j)
            ia[i][j] = colCnt * i + j

3、使用范围for

    size_t cnt = 0;
    for (auto &row : ia) // 将row声明为引用类型，避免row被自动转为指针
      for (auto &col : row)
        col = cnt;
        ++cnt;

4、指针和多维数组

    int ia[3][4];
    int (*p)[4] = ia;

5、类型别名简化多维数组的指针

    using int_array = int[4]; // typedef int int_array[4];

    for (int_array *p = ia; .....)
