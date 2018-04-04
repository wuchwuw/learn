#include <iostream>
#include <string>
using std::string;
using std::cout;
using std::endl;

int main()
{
  string s = "hahaha";
  const char *str = s.c_str();
  cout << *str << endl;  // h
  return 0;
}