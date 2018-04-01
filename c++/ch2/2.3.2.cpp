#include <iostream>

int main ()
{
  int a = 0;
  int *p = &a;
  std::cout << *p << p << std::endl;
  return 0;
}