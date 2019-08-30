## Linux

实用工具

+ [命令手册](https://jaywcjlove.gitee.io/linux-command)

## Docker

### 上手

#### 安装

官方文档 - https://docs.docker.com/install/linux/docker-ce/centos

阿里云镜像版安装文档 - https://yq.aliyun.com/articles/110806

1. 安装必要软件
```
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```
2. 添加 Docker 源（任选一个）
```
  # 官方源
  sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
  # 阿里云源
  sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
3. 安装 Docker 社区版
```
  # 我也不知道 containerd.io 是干嘛的
  sudo yum install docker-ce docker-ce-cli containerd.io
```
4. 启动
```
  systemctl start docker
```
5. 查看命令帮助
```
  docker --help
```

## Nginx

## Git

### 上手

+ [上传本地代码至Github仓库](notes/upload-local-code-to-github.md)

## 微信小程序

组件库

+ [weui](https://github.com/Tencent/weui-wxss)
+ [vant](https://github.com/youzan/vant)

示例

+ [小程序搭配ThinkJS](link:./pages/communication-between-miniprogram-and-thinkjs.adoc)

+ [vant导入小程序方法](link:./pages/use-vant.adoc)

+ [仿网易严选Demo（ThinkJS+MySQL）](https://juejin.im/entry/5af1b16d6fb9a07aca7a20d3)

## [MySQL](notes/mysql.md)

## MongoDB

### 上手

#### 安装

> 以 CentOS 7 为例

官方文档

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/

经验总结

[在CentOS上安装MongoDB<@WhiteLie1>](notes/install-mongodb-on-centos-cx.md)

### 入门

#### 访问控制

Mongo 默认不提供账户，安装完成后可以直接使用 `mongo shell` 连接至数据库。

为了进行权限控制，首先创建一个管理员权限账户。

```js
  use admin
  db.createUser(
    {
          user: "root",
          pwd: "Passw0rd!",
          roles: { "userAdminAnyDatabase", "readWriteAnyDatabase"}
    }
  )
  exit    // 退出 mongo
```

**开启访问控制**

编辑配置文件

```
vim /etc/mongod.conf
```

添加或更改

```
security.authorization: enabled
```

重启

```
systemctl restart mongod
```

使用验证方式登录

```
mongo -u admin -p --authenticationDatabase=admin
```

为指定应用创建数据库

```js
  use test
  db.createUser(
    {
      user: "appUser",
      pwd: "Passw0rd!" ,
      roles: {
        { role: "readWrite", db: "test"}
      }
    }
  )
```

> `use` 用来切换数据库。如果切换到不存在的数据库，并且插入了数据，mongo 会自动创建这个数据库。

**参阅**

https://docs.mongodb.com/manual/tutorial/enable-authentication

#### 数据验证

Mongo 与 MySQL 之类的数据库不同，它默认不对字段进行约束，而且每个文档（每条记录）的字段可以彼此不同。

这种灵活性可能会带来很大的便利性，但仍须在一定程度上对字段类型进行约束。

**设置验证器**

在创建集合（表）时，可以添加验证器对字段进行约束。

```js
db.createCollection("brands", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name"],
      properties: {
        name: {
          bsonType: "string",
        }
      }
    }
  }
})
```

验证器类型为 `$jsonSchema`

| 属性名 | 含义
|-|-|
| bsonType | mongo 存储数据的类型
| required | 必填字段
| properties | 字段属性

此时，如果插入数据中的 `name` 不为 `string` 类型，则插入失败。

除此之外，在数据中可以添加任意字段，如果它们在 `properties` 中，那这些字段就会收到约束，否则无影响。

**参阅**

https://docs.mongodb.com/manual/core/schema-validation/
https://docs.mongodb.com/manual/reference/operator/query/jsonSchema/index.html

### 进阶

#### 分布式

+ [分片集群部署](notes/deploy-shard-cluster.md)

## Python

+ [基础](notes/python-basic.md)
+ [面向对象](notes/python-object-oriented.md)

### 概览

#### 语言类型

传统的编译型语言，如：C 语言，采用先翻译全部代码，然后依次执行的过程。

Python 属于解释型语言，它采用边翻译边执行的过程。

#### 代码风格

Python 中使用缩进来划分代码块，这其实相当于其它语言中的花括号 `{}` 。

### 上手

#### 更换 pypi 源

Python 使用 pip 来管理包。由于其默认软件安装源（pypi）的位置在国外，所以国内用户的下载速度会很慢。我们一般习惯使用国内的开源镜像站点来下载软件包。

> 这里我们使用阿里巴巴开源镜像站的 pypi 镜像。

编辑配置文件

```bash
vim ~/.pip/pip.conf
```

向其加入或更新为以下内容

```conf
[global]
index-url = https://mirrors.aliyun.com/pypi/simple/

[install]
trusted-host = mirrors.aliyun.com
```

查看/检查当前配置信息

```bash
pip3 config list
```

## 提升自我修养

+ [《别像弱智一样提问》](https://github.com/tangx/Stop-Ask-Questions-The-Stupid-Ways)

+ [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/master/README-zh_CN.md)

+ [有哪些看似很傻，实则很聪明的行为？](https://www.zhihu.com/question/60809486)

## 主题美化

Windows 下 CMD 和 PowerShell 推荐使用 [Microsoft Yahei Mono](http://www.downcc.com/font/17200.html) 字体。

Git bash 可以使用 [Fira Code](https://github.com/tonsky/FiraCode/releases) 字体。

VS Code 下推荐 Material Theme，Atom One Dark 之类的主题。
