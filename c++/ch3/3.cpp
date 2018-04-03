#include <iostream>
#include <vector>
using std::vector;
using std::cout;
using std::endl;

int main()
{
  vector<int> v2;
  for (int i = 0; i != 10; ++i)
    v2.push_back(i);
  v2[0] = 10;
  cout << v2[0] << endl;
  return 0;
}