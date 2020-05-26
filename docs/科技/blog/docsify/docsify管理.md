

#### 本地运行/后台托管

[启动后台服务](https://github.com/docsifyjs/docsify-cli)

```bash
// 需要指定端口加 --port 3500
nohup docsify serve docs/ &
bash -c "nohup sh -c 'docsify serve ~/projects/tianyawiki/docs/' &"
bash -c "nohup sh -c 'node ~/projects/localservice/app.js' &"
```

显示后台的进程

```bash
ps -ef | grep "docsify serve docs"
// 501 31168 30977 0 7:10上午 ttys000 0:00.80 node /usr/local/bin/docsify serve docs/
ps -ef | grep "/app.js"
// 501  5621  2821 0 6:50下午 ttys002  0:00.25 node /Users/mai/projects/localservice/app.js
```

其中第二个数字就是进程号，用 `kill` 命令将其终止

```shell
// kill -9 31168
kill 31168 
// 合并两个命令
eval $(ps -ef | grep "docsify serve docs" | awk '{print "kill "$2}')
```

没有关闭终端的时候可以通过 **jobs** 命令终止进程。[请参考](https://maiernte.github.io/wiki/mac-memo.html)

```shell
> jobs -l
[1]+ 31279 Running  nohup docsify serve docs/ &
```

!> 上面 `[1]+` 中的 1 就是任务号，`31279` 是进程号

```javascript
> fg %jobnumber //任务提到前台 此例: jobnumber = 1
> bg %jobnumber //任务放到前台
> kill -signal %jobnumber // 终止任务
```



也可以用 python 启动服务

```shell
cd docs
nohup python -m SimpleHTTPServer 3500 &amp; // & ?
eval $(ps -ef | grep "[0-9] python -m SimpleHTTPServer" | awk '{print "kill "$2}')

// 只查看，不关闭
ps -ef | grep "[0-9] python -m SimpleHTTPServer"

// kill -9 7247
```



!> 但再 OSX 系统下，关闭终端时强行退出所有进程。以下是解决方案：

```bash
bash -c "nohup sh -c '<some command ...>' &"
```

