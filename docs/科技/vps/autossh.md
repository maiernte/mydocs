[参考文献](https://www.cnblogs.com/hongdada/p/13711688.html)  /  [项目地址](https://github.com/FeeiCN/autossh)

安装依赖

```shell
Linux
yum install expect
apt-get install expect
```

安装 autossh

```shell
$ git clone https://github.com/FeeiCN/autossh.git
$ sudo cp autossh/autossh /usr/local/bin/
```

配置服务器

```shell
$ cat ~/.autosshrc
server_name|192.168.1.110|root|password|port|is_bastion
# wufeifei|192.168.1.1|root|password|22|1
```

###### Windows

安装 putty ，然后建立一个桌面快捷方式：

```shell
"C:\Program Files\PuTTY\putty.exe" -ssh -l <username> -pw <password> -i "servername" -P 22 192.168.0.*
```

