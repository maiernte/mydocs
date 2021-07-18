###### 监控目录并同步

[跨平台的fswatch+rsync同步备份](https://segmentfault.com/a/1190000018024251) / [mac使用rsync+fswatch实现目录文件实时同步](https://shadowdragons.github.io/2017/02/02/mac-rsync-fswatch/)

###### scp 脚本命令

[在scp中使用password](https://stackoverflow.com/questions/50096/how-to-pass-password-to-scp)

###### 使用 expect 

[expect 中文教程](http://xstarcd.github.io/wiki/shell/expect_handbook.html)

[expect 自动交互脚本](http://xstarcd.github.io/wiki/shell/expect.html)

```shell
yum install -y expect
```

脚本 "deploy.exp" 文件

```shell
#!/usr/bin/expect

spawn scp -r ./libs ./resources ./dist index.js app.js jobs.js package.json <username>@<host_ip|name>:/destination_path
set pass "*******"
expect {
password: {send "$pass\r"; exp_continue}
}
```

运行

```shell
expect path_to/deploy.exp
```



