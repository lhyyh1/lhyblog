# 常用笔记

愉悦要懂得分享 , 才能加倍愉悦 。

[参考文档](https://learnku.com/docs/laravel/8.5/routing/10368)
##  Laravel部署,文件夹权限问题
::: tip Laravel部署之后, 哪些文件夹需要写权限
storage 目录包含编译后的 Blade 模板、session 会话生成的文件、缓存文件以及框架生成的其他文件。这个目录被细分成 app 、 framework 和 logs 三个子目录：
1. app 目录可以用来存储应用生成的任何文件；
2. framework 目录用来存储框架生成的文件和缓存；
3. logs 目录包含应用的日志文件。
:::
```text
如果 storage 目录的权限不正确，可能导致应用运行出现异常，例如出现：
The stream or file "/var/www/storage/logs/laravel.log" could 
not be opened: failed to open stream: Permission denied
```
### 方法一
1. 更改`storage`文件夹权限
```shell
sudo chmod -R 0755 storage
```
2. 更改 `storage` 文件夹拥有者与 `php-fpm.conf` 运行用户一致，如 `php-fpm.conf` 配置为:
```shell
user = www
group = www
```
则命令为:
```shell
sudo chown -R www:www storage
```
### 方法二
更改 `storage` 文件夹权限为`0777`
```shell
sudo chmod -R 0777 storage
```
::: danger 注意
生产服务器上应该遵循「最小权限原则」，推荐使用「方法一」
:::
## 事务

> laravel示例

```php
# use Illuminate\Support\Facades\DB;
DB::beginTransaction();
try
{
	# 多个操作数据库业务语句
	#  sql
	#  sql
	#  sql
	DB::commit();
	exit('SUCCESS');
} catch (\Exception $e) {
	DB::rollBack();
	dump($e->getMessage());
	exit('FALSE');
}
```

##	Excel导入数据

<font color="blue"><strong>安装</strong></font>

```shell
composer require phpoffice/phpexcel
```

<font color="blue"><strong>demo</strong></font>

```php
# file到导入excel的keyName
$upload_file = $_FILES['file']['tmp_name'];
$reader = new Xls();
$spreadsheet = $reader->load($upload_file);
$rows = $spreadsheet->getActiveSheet()->toArray();
```

## 图片处理

[图片处理参开](https://learnku.com/articles/38826)

```php
ini_set ('memory_limit', '1024M');
// 修改指定图片的大小
// $img = \Intervention\Image\Facades\Image::make(storage_path('app/advert/background.png')); # 以这个背景图为新图像实例
$img =  \Intervention\Image\Facades\Image::canvas(6969, 9331,'#FFFFFF'); # 创建常6969px, 宽9331,颜色为#FFFFFF的新图像实例
$img->insert(storage_path('app/advert/adimg1.jpg'), 'top', 0, 0);# 插入一张图片在新图像上面
$img->insert(storage_path('app/advert/bottom.jpg'), 'bottom', 0, 0);# 插入一张图片在新图像上面
$img->insert(storage_path('app/advert/38fb1615f404ccc2078c71ab2717dd3.jpg'), 'bottom-right', 742, 633);# 插入一张图片在新图像上面
$img->save(storage_path('app/advert/new_image.png')); # 新图像保存位置
```

## 日期值比较

<font color="blue"><strong>**whereDate / whereMonth / whereDay / whereYear / whereTime**</strong></font>

`created` 字段类型为`timestamp`

+ `whereDate` 方法是用来比较字段的值与给定的日期值是否相等 （年 - 月 - 日）
+ `whereMonth` 方法是用来比较字段的值与给定的月份是否相等（月)
+ `whereDay` 方法是用来比较字段的值与一个月中给定的日期是否相等 （日）
+ `whereYear` 方法是用来比较字段的值与给定的年份是否相等（年）
+ `whereTime` 方法是用来比较字段的值与给定的时间是否相等（时：分: 秒）

```php
+ whereDate('created_at','>','2016-12-31')
+ whereMonth('created_at', '12')   
+ whereDay('created_at', '31')
+ whereYear('created_at', '2016')
+ whereTime('created_at', '=', '11:20:45')    
```

##	where系列

### whereIn

用来验证一个字段的值是否在给定的数组中

```php
whereIn('id', [1, 2, 3])
```
### whereColumn

用来比较两个给定的字段的值是否相等

```php
whereColumn('first_name', 'last_name')
```

### 闭包分组or条件

<font color="blue"><strong>闭包和when里面return问题:</strong></font>  都可以不写return, 他们都是对象传递, 可以匿名函数内部改变对象, 当你不return回匿名函数结果的时候, 默认是返回当前的query对象, 当你return回匿名函数的时候, 结果为真, 则返回匿名函数结果(你在匿名函数里拼接多个where, 其实where方法还是返回的$this), 为假则还是返回当前的query对象 。

如果您需要在括号内对 `or` 条件进行分组，那么可以传递一个闭包作为 `orWhere` 方法的第一个参数

```php
$users = DB::table('users')
            ->where('votes', '>', 100)
            ->orWhere(function($query) {
                $query->where('name', 'Abigail')
                      ->where('votes', '>', 50);
            })
            ->get();
```

<font color="blue"><strong>等同于:</strong></font>

```php
select * from users where votes > 100 or (name = 'Abigail' and votes > 50)
```

###	when条件语句

有时候你可能想要子句只适用于某个情况为真时才执行查询。

```php
$role = $request->input('role');

$users = DB::table('users')
                ->when($role, function ($query, $role) {
                    $query->where('role_id', $role);
                })
                ->get();
```
## 自增自减
```php
DB::table('users')->increment('votes');  # 自增1

DB::table('users')->increment('votes', 5); # 自增5

DB::table('users')->decrement('votes'); # 自减1

DB::table('users')->decrement('votes', 5); # 自减5
```
<font color="blue"><strong>自增自减的同时更新数据</strong></font>
```php
User::where('id',1)->increment('money',100,['frozenMoney'=>100,'status'=>0]);
```
##  调试
```php
# use Illuminate\Support\Facades\DB;
DB::connection()->enableQueryLog();
User::where('id',1)->increment('money',100,['frozenMoney'=>100,'status'=>0]);
return DB::getQueryLog();
```

## 分页

<font color="blue"><strong>paginate</strong></font>

```php
$input = $this->request->all();

->paginate(empty($input['size']) == true ? 10 : $input['size']);
```

<font color="blue"><strong>paginate进一步处理</strong></font>

```php
/**
 * 分页查找数据
 * @param $data object
 * @param $size int 每页条数
 * @return $data array 数组
 */
function page(object $data): array
{
    // 通过分页器实例方法获取附加的分页信息
    $list['page'] = (int)$data->currentPage();
    $list['size'] = (int)$data->perPage();
    $list['totalSize'] = (int)$data->total();
    $list['totalPage'] = (int)$data->count() == 0 ? 0 : ceil($data->total() / $data->count());
    $list['list'] = $data->items();
    return $list;
}
```
## 更新json字段
更新 JSON 字段时，你可以使用 `->` 语法访问 JSON 对象中相应的值。注意，此操作只能支持 MySQL 5.7+ 和 PostgreSQL 9.5+ ：
```php
DB::table('users')
    ->where('id', 1)
    ->update(['options->enabled' => true]);
```
## 分组求和排序
关闭laravel里面的mysql严格模式, 严格模式下, select的字段要保持和groupBy的字段一致; `config/datavase.php`下`strict`的值改为`false`
```php
 $obj = User::with('superior:id,nickName,avatarUrl,sex,authStatus,memberLevel')
     ->select(
                'id',
                'p_id',
                DB::raw('count(id) as totalNum ')
            )
     # p_id 分组条件
     ->groupBy('p_id')
     # 条件判断
     ->havingRaw('p_id > ? and count(id) > ?', [0, 0])
     # 排序
     ->orderBy(DB::raw('count(id)'), 'DESC')
     ->limit(10)
     ->get();
```
## 距离搜索
存经度, 纬度, 返回给前端使用, 存point空间索引字段, 作为后端计算距离使用, 计算出来的距离单位是`km`
```php
$lng = $input['lng'];      
$lat = $input['lat'];
$where = "1=1";
if ($range) {
    # $range 范围, 最近多少km以内
    $where = DB::raw("ROUND(st_distance_sphere( point, point ( $lng, $lat ) ) /1000,2)") . " < " . $range;
}
$obj = AdvertPoint::whereRaw($where);
$storey = $obj->sum('storey'); # 楼宇总数
$unit = $obj->sum('unit'); # 单元总数
$elevator = $obj->sum('elevator'); # 电梯总数
$pointObj = $obj
    ->select([
        'id',
        'name',
        'area',
        'address',       
        'lng',
        'lat',
        DB::raw("ROUND(st_distance_sphere( point, point ( $lng, $lat ) ) /1000,2) AS 'distance'") # 单位km
    ])
    ->orderBy('distance', 'ASC')
    ->paginate(empty($input['size']) == true ? 10 : $input['size']);
return $this->success(page($pointObj));

function page(object $data): array
{
    // 通过分页器实例方法获取附加的分页信息
    $list['page'] = (int)$data->currentPage();
    $list['size'] = (int)$data->perPage();
    $list['totalSize'] = (int)$data->total();
    $list['totalPage'] = (int)$data->count() == 0 ? 0 : ceil($data->total() / $data->count());
    $list['list'] = $data->items();
    return $list;
}
```

##	常用设置
### 队列设置超时
队列一般需要用<font color="blue"><strong>Supervisor</strong></font>守护
```shell
# 启动命令
/usr/bin/php /www/wwwroot/xindan.api.shuxiaoniu.com/artisan queue:work --queue=xindan --timeout=0
```
### 接收参数空字符串被转换为null
在`app\Http\Kernel.php`文件夹中，注释全局中间件：
```php
<?php
namespace App\Http;
use Illuminate\Foundation\Http\Kernel as HttpKernel;
class Kernel extends HttpKernel
{   
    protected $middleware = [
         ...
        // 下面这个中间件表示: 提交空字符串转为null
//        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    ];
    ...    
}
```
### 以www用户设置定时任务
```sh
crontab -u www -e
```
### 伪静态规则

```conf
location / {
    try_files $uri $uri/ /index.php?$query_string;
 }
```
### 自定义函数
+ 创建文件 `app/helpers.php`
  ```php
  <?php
  // 示例函数
  function foo() {
      return "foo";
  }
  ```
+ 修改项目`composer.json`
  在项目 `composer.json`中 `autoload` 部分里的 `files` 字段加入该文件即可：
  ```conf
  {
      ...
  
      "autoload": {
          "files": [
              "app/helpers.php"
          ]
      }
      ...
  }
  ```
+ 最后一步: 运行下面命令
  ```sh
  composer dump-autoload
  ```
  OK，然后你就可以在任何地方用到 `app/helpers.php` 中的函数了。
##  常见bug
### 报错`Too Many Attempts`
这是因为`laravel`从5.2开始，增加了一个Throttle的中间件。在`app/Http/Kernel.php`文件，你就会发现，`api`路由是默认使用了这个中间件的。
这个中间件的作用是限制同一个`Ip`访问同一个`Api`的访问次数，模式是1分钟内只能访问60次，超过60次，则会返回Too Many Attempts 429状态。需要等待1分钟后才可以访问;
修改:
```php
# app/Http/Kernel.php 先直接注销调这行, 本质原因是代理的原因, 导致所有用户访问都是一个ip
'api' => [
    // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    # 限制同一个Ip访问同一个Api的访问次
    #'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```
## artisan命令系列
### 创建Laravel项目
```sh
composer create-project laravel/laravel poster
```
<font style="color: blue"><strong>注意</strong></font>
+ `poster`是项目文件夹名称, 可以自定义
+ window系统用`cmd`小黑框安装执行, 即root执行
+ 不要忘了经常执行 `composer selfupdate` 以保持 Composer 一直是最新版本哦！
### 路由缓存
<font style="color: blue"><strong>生成路由缓存</strong></font>
如果您的应用程序只使用了基于控制器的路由，那么您应该利用 Laravel 的路由缓存。路由缓存会大大减少注册所有路由所需的时间。在某些情况下，路由注册的速度甚至能快上 100 倍。要生成路由缓存，只需执行 artisan 命令
```sh
php artisan route:cache
```
运行此命令后，将在每个请求上加载缓存的路由文件。记住，如果添加了任何新的路由，则需要重新生成新的路由缓存。因此，您应该在项目部署的时候运行 `route:cache` 命令。
<font style="color: blue"><strong>清除路由缓存</strong></font>
```php
php artisan route:clear
```
### 数据库迁移
<font style="color: blue"><strong>生成迁移</strong></font>
```sh
php artisan make:migration create_users_table
```
<font style="color: blue"><strong>执行迁移</strong></font>
```sh
php artisan migrate
```
### 定义中间件
```sh
php artisan make:middleware xxx
```
### 定义计划任务
```sh
php artisan make:command xxx
```
##  ORM操作

### 模型内部关联

```php
# Model
protected $fillable = [
        'name',
        'p_id',
        'level',
        'url'
    ];

public function children(): HasMany
{
    return $this->hasMany(Address::class, 'p_id','id');
}
# 控制器, 查询出一级地址和所有二级地址, 并形成上下级
public function address(): JsonResponse
{
    $data = Address::with([
        'children:id,name,p_id'
    ])
        ->select(['id', 'name'])
        ->where(['level' => Address::LEVEL])
        ->get();
    return $this->success($data);
}
```

### ORM中with的写法

```php
# 第一种
public function address(): JsonResponse
{
    # 需要指定字段的写法
    $data = Address::with([
        'children:id,name,p_id'
    ]); 
    # 不需要指定字段
    $data = Address::with([
        'children'
    ]); 
    # 需要指定条件
    $data = Address::with([
        'children'=>function($query){
            $query->slect(['id','name'])
                ->where('status','=','1');
        }
    ]); 
    
}
    
```

### 访问器

> 二维和一维都可以用, 避免使用循环查询数据

```php
# Model
# 获取器 `not_launch` ,如果model有这个字段, 可以重定义这个字段的值, 如果没有这个字段, 就可给model新增一个字段
public function getNotLaunchAttribute()
{
	return 100;
}
# 控制器中使用
public function userDetail(): JsonResponse
{
    $created_by = $this->request->id;
    $data = User::where('id', '=', $created_by)       
        ->first();
    # 把获取器里面的新增属性`not_launch` 追加到返回值里面去
    $data->append(['not_launch']);

    return $this->success($data);
}
```

### 修改器

属性已经存在, 直接修改原来的属性值,有点和获取器相反的感觉!

### with查找出来的对象访问问题

```php
$orderObj = Order::with([
            'UserInfo:id,openId'
        ])->where([
            'id' => $input['id'],
            'created_by' => $this->request->id
        ])->first();
# 访问关联模型UserInfo里面的id,openId
$id = $orderObj->UserInfo->id;
$openId = $orderObj->UserInfo->openId;
# 修改openId为888
$orderObj->UserInfo->openId = 888;
$orderObj->UserInfo->save();
```

### `join`关联查询

`laravel orm`基本都基于子查询, 而子查询在使用中会建立一张临时表进行数据排序等,而join则不会,所以子查询又慢又占用内

```php
$issues = Issue::where('issues.status', 0)
    ->join('projects', function ($join) use ($user){
        $join->on('issues.project_id', '=', 'projects.id')->whereIn('projects.id', ProjectsUser::where('user_id',$user->id)->pluck('project_id')->toArray());
    })->get();

 $student = Student::leftJoin('banji_students as s','students.id','=','s.student_id')
                ->select('students.*','s.banji_id')
                ->where('banji_students.banji_id',null)
                ->get();
```

### `orm`关联查询代码

```php
#查询关联模型OrderAppoint中id=4的数据
$orderObj = Order::with('OrderAppoint')
            ->whereHas('OrderAppoint', function($query){
                $query->where('id',4);
            })
            ->whereIn('type', ['OrderAppoint', 'OrderTime'])
            ->orderBy('id', 'DESC')
            ->first();

​```````````````````````````````````````````````````````````````````````````````````````````````````````
# 按昵称或者电话搜索, 没传默认搜索全部
$input = $this->request->all();
$sou = empty($input['sou']) == true ? false : $input['sou'];
$obj = UserIdentity::with('UserInfo:id,nickName,avatarUrl,phone,memberLevel,authStatus,sex')
    ->whereHas('UserInfo', function ($query) use ($sou) {
        $query->when($sou,function ($query,$sou){
            return $query->where('nickName','like','%'.$sou.'%')
                ->orwhere('phone','like','%'.$sou.'%');
        });
    })
    ->orderBy('id', 'DESC')
    ->paginate(empty($input['size']) == true ? 10 : $input['size']);
return $this->success(page($obj));
```

### 参考with的访问和修改问题

```php
$obj->name='小明';
$obj->save();
$obj->UserInfo->age=18;
# 修改问题
$obj->UserInfo->save()
# 可以通过这样, 修改模型和关联模型的数据    
```
## 常用参考资料
+ [腾讯地址解析](https://lbs.qq.com/service/webService/webServiceGuide/SmartGeocoder)
