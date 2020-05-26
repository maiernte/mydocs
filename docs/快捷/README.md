###### 工程有关

启动本地 docsify 以及 localservice 服务 

```bash
bash -c "nohup sh -c 'docsify serve ~/projects/tianyawiki/docs/' >/dev/null 2>&1 &"
bash -c "nohup sh -c 'node ~/projects/localservice/app.js' >/dev/null 2>&1 &"
# 忽略全部输出
bash -c "nohup sh -c 'command...' >/dev/null 2>&1 &"
```

查找并终止进程

```bash
ps -ef | grep "docsify serve docs"
ps -ef | grep "/app.js"
kill -9 %processid%
```



docsify 常驻内存以后，占用 35729 lrport 端口，启动 Gitbook 需要指定不同端口

```bash
gitbook --lrport 35730 --port 4000 serve
```

###### 华鹤易学平台备忘录

[常用编译指令](科技/华鹤易学项目/备忘录#在线版编译)