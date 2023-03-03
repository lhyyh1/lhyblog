# 技巧篇
##  1. [array_diff()](https://www.php.net/manual/zh/function.array-diff.php)
::: tip 比较两个数组的值, 并返回差集
对比 array 和其他一个或者多个数组，返回在 array 中但是不在其他 array 里的值。

语法:  array_diff(array $array, array ...$arrays): array

参数:<br>
    1.   array  要被对比的数组<br>
    2.   arrays  和更多数组进行比较

用于比较两个（或更多个）数组的值，并返回差集; 返回一个差集数组，该数组包括了所有在被比较的数组（array1）中，但是不在任何其他参数数组（array2 或 array3 等等）中的值。
:::
```php
$arr1 = ['a',1,2,3,4,'name'=>'小明'];
$arr2 = ["a", "c",1,'age'=>'小明'];
$a = array_diff($arr1, $arr2);
var_dump($a);

# 输出
array(3) {
  [2]=>
  int(2)
  [3]=>
  int(3)
  [4]=>
  int(4)
}
```
::: warning 讲解案例
1. 数组$arr1和$arr2比较, 比较的是值, 不是键;
2. 在$arr1中排除$arr2中出现过得值, 然后返回的是$arr1剩下的值组成的数组;
3. $arr2中有一些新的值, 且在$arr1中不存在, 这个不用管。
:::