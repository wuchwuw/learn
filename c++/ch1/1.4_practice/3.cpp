#include <iostream>

int main ()
{
  int n = 0, m = 0, t = 0;
  std::cout << "输入两个整数" << std::endl;
  std::cin >> n >> m;
  if (n > m) {
    t = m;
    m = n;
    n = t;
  }
  while (n <= m) {
    std::cout << n << std::endl;
    n++;
  }
  return 0;
}