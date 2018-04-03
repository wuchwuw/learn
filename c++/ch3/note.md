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

