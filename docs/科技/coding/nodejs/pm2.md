###### forever需要安装到全局环境下

安装： `npm install forever -g`

启动 ：`forever app.js #前台进程` `forever start app.js #后台进程`

停止 ：`forever stop app.js`

 

######  pm2的特性：

-   内建负载均衡（使用 Node cluster 集群模块）；
-   后台运行；
-   0 秒停机重载，维护升级时不需要停机；
-   具有 Ubuntu 和 CentOS 的启动脚本；
-   停止不稳定的进程（避免无限循环）；
-   控制台检测；
-   提供 HTTP API；
-   远程控制和实时的接口 API ( Nodejs 模块，允许和 PM2 进程管理器交互 )。

安装： `npm install pm2@latest -g`

启动 ：`pm2 start app.js`
停止 ：`pm2 kill`

pm2启动命令
1. pm2 start app.js：启动nodeJs应用，进程的默认名称为文件名app
2. pm2 start app.js --name mynode：启动node，并指定进程名称为mynode
3. pm2 start app.js -i max：根据有效CPU数目启动最大进程数目
4. pm2 start app.js -i 3：启动3个进程
5. pm2 start app.js --watch：实时监控的方式启动，app.js文件有变动时，pm2会自动reload
6. pm2 start app.js -x：用fork模式启动 app.js 而不是使用 cluster
7. pm2 start app.js -x -- -a 23：用fork模式启动 app.js 并且传递参数（-a 23）
8. pm2 start app.json：启动进程, 在 app.json里设置选项
9. pm2 start app.js -i max -- -a 23：在 -- 之后给 app.js 传递参数
10. pm2 start app.js -i max -e err.log -o out.log：启动并生成一个配置文件
pm2查看与监视进程
1. pm2 list：显示所有进程；
2. pm2 show 0，pm2 info 0：查看进程id为 0 的详细信息；
3. pm2 monit：进入监视页面，监视每个node进程的CPU和内存的使用情况。
pm2停止、删除进程
1. pm2 stop/delete 0：停止/删除id为 0 的进程；
2. pm2 stop/delete all：停止/删除所有进程。
pm2重启、重载
1. pm2 restart 0：重启id为 0 的进程；
2. pm2 restart all：重启所有进程；
3. pm2 reload 0：0秒停机重载id为 0 进程（用于 NETWORKED 进程）；
4. pm2 reload all：重载所有进程。
pm2日志操作
1. pm2 logs：显示所有进程的日志；
2. pm2 logs 0：显示进程id为 0 的日志；
3. pm2 flush：清空所有日志文件；
4. pm2 reloadLogs：重载所有日志。
pm2 startup：产生 init 脚本，保持进程活着。