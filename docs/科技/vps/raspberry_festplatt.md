###### 1 查看分区

 `sudo fdisk -l` 找到以下信息

> **Disk /dev/sda: 447.13 GiB, 480103981056 bytes, 937703088 sectors**

###### 2 进行分区

```shell
sudo fdisk /dev/sda
```

强行分出三个分区，一路按默认值往下走就可以了。结束后重新 fdisk -l 查看新分区信息

```
Device         Start       End   Sectors   Size Type
/dev/sda1         40    409639    409600   200M EFI System
/dev/sda2     411648 937439231 937027584 446.8G Microsoft basic data
/dev/sda3  937439232 937703054    263823 128.8M Linux filesystem
```

###### 3 格式化分区

用linux最新的格式(*对大的那个分区格式化就可以，两个小的不管*)

```shell
sudo mkfs -t ext4 /dev/sda2
```

###### 4 挂载新分区到系统

创建一个新目录用于存储mongodb的数据 `/home/mongodata`，然后挂载进来

```shell
sudo mount /dev/sda2 /home/mongodata/
sudo umount /dev/sda2 #出错就卸载
```

```shell
df -h #查看挂载情况
...
/dev/sda2       439G   73M  417G   1% /home/mongodata
```

###### 5 配置开机自动挂载

查找分区的 UUID

```shell
sudo blkid #两个命令都可以查看分区到 UUID
ls -l /dev/disk/by-uuid
```

```shell
/dev/sda2: UUID="9da95930-332b-43d9-9f05-39c7cd9a66f8" TYPE="ext4" PARTUUID="9d3d5711-ae78-46a0-b093-57fb25f4ec62"
```

查看磁盘结构

```shell
$> lsblk
sda                 8:0    0 447.1G  0 disk 
└─sda1              8:1    0 447.1G  0 part 
  └─datavg-datalv 253:0    0   400G  0 lvm  
sdb                 8:16   1    30G  0 disk 
└─sdb1              8:17   1    30G  0 part /home/mongobackup
```



将硬盘信息添加到/etc/fstab 末尾

```shell
UUID=9da95930-332b-43d9-9f05-39c7cd9a66f8 /home/mongodata ext4 defaults 0 2
```

> 第六列是fsck磁盘检查设置。其值是一个顺序。当其值为0时，永远不检查；而 / 根目录分区永远都为1。其它分区从2开始，数字越小越先检查，如果两个分区的数字相同，则同时检查。



###### 6 磁盘速度测试

安装测试工具

```shell
sudo apt-get install hdparm
```

测试本地 SD 卡（ext4 格式）的读写速度：`sudo hdparm -Tt /dev/mmcblk0p2` 

> df -h 命令找到本地卡的名称，测试结果如下

```shell
/dev/mmcblk0p2:
 Timing cached reads:   1682 MB in  2.00 seconds = 842.24 MB/sec
 HDIO_DRIVE_CMD(identify) failed: Invalid argument
 Timing buffered disk reads: 128 MB in  3.00 seconds =  42.60 MB/sec
```

测试图像写入速度。`dd count=50 bs=1M if=/dev/zero of=/test.img`

```
52428800 bytes (52 MB, 50 MiB) copied, 0.211637 s, 248 MB/s
```

测试SSD硬盘（ext4 格式）的读写速度：`sudo hdparm -Tt /dev/sda2` 

```shell
/dev/sda2:
 Timing cached reads:   1668 MB in  2.00 seconds = 834.97 MB/sec
 Timing buffered disk reads: 654 MB in  3.01 seconds = 217.25 MB/sec
```

测试图像写入速度。`dd count=50 bs=1M if=/dev/zero of=/home/mongodata/test.img`

```
52428800 bytes (52 MB, 50 MiB) copied, 0.21479 s, 244 MB/s
```

结果比SD卡的速度要高出4倍！



[参考文章](https://blog.csdn.net/jorondo/article/details/104504408)

[文章二](https://blog.csdn.net/jorondo/article/details/104504408)

[fstab 参数详解](https://blog.csdn.net/qq_36357820/article/details/78421242)

[磁盘速度测试](https://post.smzdm.com/p/a25rzkxn/)