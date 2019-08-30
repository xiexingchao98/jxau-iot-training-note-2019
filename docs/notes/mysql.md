# MySQL

## 安装

### Windows(ZIP安装包)

官方文档

https://dev.mysql.com/doc/refman/5.7/en/windows-install-archive.html

> 安装包为 5.7 版本

**步骤**

1. 同时按下 WIN + X 键，打开 Powershell（管理员模式）
2. 进入 mysql 目录

```
  cd 'mysql_dir/bin'
```

3. 执行初始化操作

```
  ./mysqld --initialize
```

4. 搜索 `*.err` 文件，打开后可在最后一行看到默认登陆密码，例如： `A temporarily password has generated for ...`

5. 启动 mysql

```
  ./mysqld --console
```

6. 将 `mysql` 的 `bin` 目录添加到 `path` 环境变量（方便在命令行中使用 mysql）

7. 登陆

```
  mysql -uroot -p
```

8. 更改密码

```
  alter user 'root'@localhost identified by 'new password'
```

## 常见问题

### 编码

**查看和设置数据库编码**

```mysql
# 查看编码
show variables like "%char%"

# 设置编码
set character_set_xxx utf8
```

> 此方法仅本次有效，下次启动或者登陆时，会加载默认配置


**在配置文件中设置编码**

在 `mysql` 目录中找到或者创建 `my.ini` 文件，并依据具体情况加入以下内容：

```
[mysqld]
character-set-server=utf8

[client]
default-character-set=utf8

[mysql]
default-character-set=utf8
```

> 此方法应该不适用于以 `zip` 格式安装的用户

**插入中文数据发生错误**

创建表时指定 `utf8` 编码即可。

```mysql
create table user (name varchar(20)) default charset=utf8;
```
