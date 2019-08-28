# MongoDB

## 安装

> 以 CentOS 7 为例

官方文档

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/

经验总结

[在CentOS上安装MongoDB<@WhiteLie1>](notes/install-mongodb-on-centos-cx.md)

## 访问控制

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

## 数据验证

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

## GUI工具

* [MongoDB Compass](https://www.mongodb.com/download-center/compass?jmp=hero)
* [Navicat](https://www.cr173.com/soft/126934.html)

## 分布式

+ [分片集群部署](notes/deploy-shard-cluster.md)
