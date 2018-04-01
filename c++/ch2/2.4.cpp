#include <iostream>

int main ()
{
  // double pi = 3.14;
  // const double x = 3.1;
  // const double *const ptr = &pi;
  // std::cout << *ptr << '\n' << pi << std::endl;
  int i = 0;
  const int *p = &i;
  i = 10;
  std::cout << i << std::endl;
  return 0;
}