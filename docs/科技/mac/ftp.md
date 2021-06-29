[攻略](https://www.linuxprobe.com/ubuntu-ftp-service.html)

安装：` sudo apt-get install vsftpd `

配置：`vim /etc/vsftpd.conf`

充许匿名访问

```shell
anonymous_enable=YES
anon_root=/home/aborn/ftp
anon_max_rate=2048000
```

卸载 `apt-get remove vsftpd --purge`

设置该目录有可访问权限

` sudo usermod -d /home/aborn/ftp ftp`

- 查看FTP服务是否运行中：service vsftpd status
- 查看本地是否含有包含ftp的进程开启：ps -ef | grep ftp
- FTP设置开机自动运行：chkconfig vsftpd on
- 关闭FTP开机自动运行：chkconfig vsftpd off
- 查看所有服务开启自动运行的情况：chkconfig --list
- 启动FTP服务：service vsftpd start
- 停止FTP服务：service vsftpd stop
- 重启FTP服务：service vsftpd restart

```shell
systemctl start vsftpd.service #启动
systemctl enable vsftpd.service #开机自启
```

###### 创建用户

2）创建用户 `useradd ftpUser -m`

为该用户添加密码

`passwd ftpUser` 回车

输入密码：`....`

并添加到 vsftpd.userlist 文件当中 `echo "ftpUser" | sudo tee -a /etc/vsftpd.chroot_list`

3）修改配置文件` vim /etc/vsftpd.conf `

修改或添加如下行：

```shell
anonymous_enable=NO             # 关闭匿名登录
local_enable=YES        # 允许本地用户登录
write_enable=YES        # 启用可以修改文件的 FTP 命令
local_umask=022             # 本地用户创建文件的 umask 值
dirmessage_enable=YES           # 当用户第一次进入新目录时显示提示消息
xferlog_enable=YES      # 一个存有详细的上传和下载信息的日志文件
connect_from_port_20=YES        # 在服务器上针对 PORT 类型的连接使用端口 20（FTP 数据）
xferlog_std_format=YES          # 保持标准日志文件格式
listen=NO               # 阻止 vsftpd 在独立模式下运行
listen_ipv6=YES             # vsftpd 将监听 ipv6 而不是 IPv4，你可以根据你的网络情况设置
pam_service_name=vsftpd         # vsftpd 将使用的 PAM 验证设备的名字
userlist_enable=YES             # 允许 vsftpd 加载用户名字列表
tcp_wrappers=YES        # 打开 tcp 包装器
```

4）重启vsftp `service vsftpd restart`

5) 终端远程登录写用户和密码就好，用ForkLift登录端口为21

具体设置参考以下 [gist.github](https://gist.github.com/maiernte/c3ade85579bb0cc86deae8b800b545b9)

<script src="https://gist.github.com/maiernte/c3ade85579bb0cc86deae8b800b545b9.js"></script>