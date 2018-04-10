#include <iostream>
#include <string>
#include <vector>
using std::vector;
using std::string;
using std::cout;
using std::endl;

int main()
{
  vector<int> s1 = {1, 2, 3, 4};
  vector<int>::iterator it = s1.begin();
  cout << ++*it << endl;
  return 0;
}