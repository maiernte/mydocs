树莓派安装Ubunt：[文章1](https://ywnz.com/linuxaz/6997.html) https://zhuanlan.zhihu.com/p/137115309#:~:text=01.%E5%B0%86SD%20%E5%8D%A1%E6%8F%92%E5%85%A5,%E7%9A%84Pi%20%E7%89%88%E6%9C%AC%E8%BF%9B%E8%A1%8C%E9%80%89%E6%8B%A9%E3%80%82

> 第一次插电的时候，连不上显示器，回头发现network-config之前改了，也被重新覆盖。把SD卡插回电脑，再改一次，然后断电，重新插电。第二次通电后显示器连接上了。
>
> 填写网络名需要注意后面的冒号。第一次进不去，启动第二次就好了



```
wifis:
  wlan0:
    dhcp4: true
    optional: true
    access-points:
      UPC1647EDF:
        password: "PzrySaynfhm2"
      iPhone:
        password: "12345678"
```

`ubuntu` 用户没有修改公共区域的权限，需要用root用户登陆，但是root用户默认不允许ssh登陆。

```shell
sudo passwd root #修改root的密码
su root          #转成root身份，否则ubuntu用户没有办法修改任何文件
# 修改 /etc/ssh/sshd_config 文件
PermitRootLogin yes #然后重启ssh服务
sudo service ssh restart
```

开机一直停留在 cloud-init 的问题 (*需要用root身份才能改*)

`touch /etc/cloud/cloud-init.disabled`

安装桌面环境 `$sudo apt-get  install gnome`



```
当前图形界面时，按Ctrl+Alt+F1切换到字符界面；
当前字符界面时，按Ctrl+Alt+F7切换到图形界面；
```

- 如果想开机默认进入命令行模式：
  输入命令：sudo systemctl set-default multi-user.target
  然后重启一下：reboot
  如果想暂时回到图形界面，只需要输入命令：startx
  从图形界面切换回命令行：Ctrl+Alt+F7

- 如果想开机默认进入图形用户界面：
  输入命令：sudo systemctl set-default graphical.target
  然后重启一下：reboot
  如果想暂时回到命令行模式：Ctrl+Alt+F1
  从命令行切换到图形界面：Ctrl+Alt+F7

###### 查看CPU 和 内存的使用情况

`$ htop`  使用$:sudo apt-get install htop进行安装htop工具