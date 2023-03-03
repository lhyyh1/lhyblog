# 日常杂记

愉悦要懂得分享 , 才能加倍愉悦 。

##	常见bug

### 代码修改后延时生效问题

<font style="color:blue; font-weight:bold">原因:</font>

 一般就是缓存原因,导致代码修改后不能及时生效

<font style="color:blue; font-weight:bold">解决:</font>

+ 检查nginx配置文件是否设置缓存
+ 检查php.ini是否设置缓存
  + **opcache.revalidate_freq=60 表示缓存过期时间为60秒**
  + 修改为**opcache.revalidate_freq=0** 表示每次请求都要去检查

## curl采集
```php
/**
 * 抓取curl
 * @param $url string 抓取的地址
 * @param $method string 请求方式
 * @param $params array 数组参数
 * @return array
 */
  private function curl(string $url, string $method = 'GET', array $params = []): array
  {
      $header[] = 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36';
      $curl = curl_init(); #  初始化一个curl会话
      curl_setopt($curl, CURLOPT_URL, $url); # 想用PHP取回的url地址
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, True); # 设定是否显示头信息
      curl_setopt($curl, CURLOPT_FOLLOWLOCATION, True); # 是否会跟踪爬取重定向页面
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, False); # 不检测证书
      curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, False); # 不检测证书
      curl_setopt($curl, CURLOPT_HEADER, False); # 是否返回请求头信息
      curl_setopt($curl, CURLOPT_HTTPHEADER, $header); # 设置header头内容
      curl_setopt($curl, CURLOPT_ENCODING, 'gzip'); # 解释gzip内容
      # 判断请求类型
      if ($method != 'GET') {
          # CURLOPT_POST: 发送一个常规的POST请求，类型为：application/x-www-form-urlencoded，类似提交表单。
          curl_setopt($curl, CURLOPT_POST, True);
          curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($params));
      }
      $data = curl_exec($curl); # 执行一个curl会话
      curl_close($curl); # 关闭curl会话
      return json_decode($data, True);
  }
```
## json_encode函数

php格式json的函数, 经常在加密的时候会遇到, 出现中文或者反斜杠转移的问题, 导致加密出来的结果不一致。

<font style="color:blue; font-weight:bold">语法格式</font>

```php
json_encode($value,$options)
```

其中有2个比较常用到的参数

`JSON_UNESCAPED_UNICODE`  (中文不转为`unicode` ，对应的数字 256)

`JSON_UNESCAPED_SLASHES` （不转义斜杠，对应的数字 64）

通常json_encode只能传入一个常量，如果同时使用2个常量怎么办？

`JSON_UNESCAPED_UNICODE` + `JSON_UNESCAPED_SLASHES` = `320`

使用方法:json_encode($arr,320) ;   即可完成同时使用2个常量

##	时间函数

###	date()函数
用于格式化时间/日期。可把时间戳格式化为可读性更好的日期和时间。

<font color="blue"><strong>语法</strong></font>

```sh
string date ( string $format [, int $timestamp ] )
```

| 参数 | 描述 |
| ---- | ---- |
| format  | 必须, 规定时间戳的格式  |
| timestamp  | 可选, 规定时间戳, 默认是当前的日期和时间  |
```php
echo date("Y-m-d H:i:s");  //输出:  2021-10-26 14:32:19
```
<font color="blue"><strong>参数 format 的常用可用字符:</strong></font>
1. `d` - 代表月中的天 (01 - 31)
2. `m` - 代表月 (01 - 12)
3. `Y` - 代表年 (四位数)
4. `H` - 小时，24 小时格式，有前导零, 00 到 23
5. `i` - 分钟数, 有前导零, 	00 到 59
6. `s` - 秒数，有前导零, 00 到 59

### strtotime()函数
将任何字符串的日期时间描述解析为 Unix 时间戳（自 January 1 1970 00:00:00 GMT 起的秒数）。

<font color="blue"><strong>语法</strong></font>
```sh
int strtotime ( string $time [, int $now = time() ] )
```
| 参数 | 描述 |
| ---- | ---- |
| time | 必须, 规定日期/时间字符串 |
| now | 可选, 规定用来计算返回值的时间戳, 如果省略该参数, 则使用当前时间戳 |

<font color="blue"><strong>返回值:</strong></font> 成功则返回时间戳，失败则返回 FALSE。

```php
echo "今天:".date("Y-m-d")."<br>"; //今天:2021-10-28
echo "昨天:".date("Y-m-d",strtotime("-1 day")), "<br>"; //昨天:2021-10-27
echo "明天:".date("Y-m-d",strtotime("+1 day")). "<br>"; //明天:2021-10-29
echo "去年:".date("Y-m-d",strtotime("-1 year")); //去年:2020-12-22
// 输出当天0点时间
echo date("Y-m-d 00:00:00", time()) . PHP_EOL;
// 输出当天最后一秒时间
echo date("Y-m-d 23:59:59", time()) . PHP_EOL;
// 输出: 2021-10-26 15:26:36
echo date("Y-m-d H:i:s", strtotime("now")) . PHP_EOL;
// 输出: 2021-10-26 20:26:36
echo date("Y-m-d H:i:s", strtotime("+5 hours")) . PHP_EOL;
// 输出: 2021-09-21 15:26:36
echo date("Y-m-d H:i:s", strtotime("-5 week")) . PHP_EOL;
// 输出: 2021-11-05 22:26:41
echo date("Y-m-d H:i:s", strtotime("+1 week 3days 7 hours 5 seconds")) . PHP_EOL;
// 输出: 2021-11-01 00:00:00
echo date("Y-m-d H:i:s", strtotime("next Monday")) . PHP_EOL;
// 输出: 2021-10-24 00:00:00
echo date("Y-m-d H:i:s", strtotime("last Sunday")) . PHP_EOL;
// 输出: 2021-09-26 00:00:00
echo date("Y-m-d H:i:s", strtotime("-1 month", strtotime("2021-10-26"))) . PHP_EOL;
// 输出 2021-11-26 00:00:00
echo date("Y-m-d H:i:s", strtotime("+1 month", strtotime("2021-10-26"))) . PHP_EOL;
// 输出: 2021-10-26 00:00:00
echo date("Y-m-d H:i:s", strtotime("next month", strtotime("2021-09-26"))) . PHP_EOL;
// 输出: 2021-08-26 00:00:00
echo date("Y-m-d H:i:s", strtotime("last month", strtotime("2021-09-26"))) . PHP_EOL;
// 输出: 2021-08-31 00:00:00
echo date("Y-m-d H:i:s", strtotime("last day of -1 month", strtotime("2021-09-26"))) . PHP_EOL;
// 输出: 2021-10-01 00:00:00
echo date("Y-m-d H:i:s", strtotime("first day of +1 month", strtotime("2021-09-26"))) . PHP_EOL;
// 输出: 2021-10-01 00:00:00
echo date("Y-m-d H:i:s", strtotime("first day of next month", strtotime("2021-09-26"))) . PHP_EOL;
// 输出 2021-08-31 00:00:00
echo date("Y-m-d H:i:s", strtotime("last day of last month", strtotime("2021-09-26"))) . PHP_EOL;
```

从PHP5.3开始呢, date新增了一系列修正短语, 来明确这个问题, 那就是"first day of" 和 "last day of", 也就是你可以限定好不要让date自动"规范化"。
### 获取当前毫秒时间戳
```php
// 获取当前毫秒时间戳
list($mSec, $sec) = explode(' ', microtime());
$millisecond = (float)sprintf('%.0f', (floatval($mSec) + floatval($sec)) * 1000);
echo $millisecond; // 1635238562054
```
## 异常处理
```php
try
{
  $a = 3;
  if($a > 0){
    # 当变量a大于0的时候, 抛出异常
    throw new \Exception('变量a不能大于0');
  }
} catch (\Exception $e) {
  var_dump($e->getMessage());
}
```

## 判断一个不确定存在的变量

```php
public function test()
{
    if (isset($payload['iat']) && $payload['iat'] !== '')
    {
        echo 123;die;
    }
    echo 88;die;
}
```

