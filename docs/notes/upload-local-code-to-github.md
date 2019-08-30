# 上传本地代码至Github

*作者：[@WhiteLie1](https://github.com/WhiteLie1)*

1. 在 Github 中创建一个和自己项目名字一样的仓库

  我自己创建的就是一个文件夹 demo

2. 打开 Git bash

  在自己本地的项目 demo 文件夹中，在空白处，使用鼠标右键选择 `Git bash here`

3. 初始化 Git 仓库
```
  git init
```
4. 添加远程仓库地址
```
  // 请使用你自己的仓库地址
  git remote add origin https://github.com/WhiteLie1/demo.git    
```
5. 添加文件至暂存区
```
  git add -A    // 添加所有文件
```
6. 提交暂存区的修改（提交至本地）
```
  git commit -m "Init repo"
```
7. 将代码推送到远程仓库的 master （主）分支
  （前提将项目的.md文件下载到电脑 用 $ git pull --rebase origin master 指令实现）
```
  git push -u origin master
```

当远程数据仓库和本体的关联以后就可以进行日常的操作了。

首先呢，一定是在你项目当前的目录下打开 `Git bash here` ,然后你需要做的是：

```bash
// 添加所有修改过或新增的文件
git add .

// 查看文件状态
git status

// 提交并说明修改情况
git commit -m "修改了某文件"

/ 推送到远程仓库
git push
```
