##### mongodump

```
mongodump --uri="mongodb://user:pw@192.168.0.136:33720" --authenticationDatabase admin -d Stock -o ~/projects/Backup
mongorestore --uri="mongodb://user:pw@217.160.61.19:33720" --authenticationDatabase admin -d stockapi ~/projects/Backup/stockapi
```

注意备份前锁写操作

```
db.fsyncLock() # 备份前锁住数据库的写操作
db.fsyncUnlock()
```

##### 压缩文件备份

将目录压缩到一个文件当中

```shell
tar -czf /home/ubuntu/Backup/`date +%F`_mongo_all.tar.gz /home/mongodata/data/
```

解压到原来的目录

```shell
tar -xzf /home/mongodata/backup/2017-07-01_mongo_all.tar.gz -C /
```



##### 硬盘快照

[linux物理卷管理](https://www.cnblogs.com/despotic/p/11951886.html)  / [Linux LVM 总结](https://www.cnblogs.com/zknublx/p/9188341.html)

###### 1 挂载一个USB并且格式化

```
sudo fdisk /dev/sdb
```

###### 2 三个分区全部转换成pv，「物理分区」

```
pvcreate /dev/sdc{1,2,3}
```

```shell
$> pvs #显示结果
  PV         VG Fmt  Attr PSize   PFree  
  /dev/sdc1     lvm2 ---  <30.00g <30.00g
```

###### 3 创建卷组 VG （VolumeGroup）

```shell
vgcreate datavg /dev/sdc1

$> pvs #显示结果, sdc1 有组织了，datavg
  PV /dev/sdc1   VG datavg          lvm2 [<30.00 GiB / <30.00 GiB free]
  Total: 1 [<30.00 GiB] / in use: 1 [<30.00 GiB] / in no VG: 0 [0   ]
```

```shell
vgdisplay datavg
  --- Volume group ---
  VG Name               datavg
  System ID             
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  1
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                0
  Open LV               0
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               <30.00 GiB
  PE Size               4.00 MiB
  Total PE              7679
  Alloc PE / Size       0 / 0   
  Free  PE / Size       7679 / <30.00 GiB
  VG UUID               dJn9zW-GqrI-L3Ak-0EMy-mk0k-Xlli-SKGpFj
```

> 7679 * 4M 大概就是30GB左右



**3.1 VG 扩容/减少**

```shell
vgextend datavg /dev/sdd # /dev/sdd 是新的物理硬盘
vgreduce datavg /dev/sdd # 减少
```

导出物理卷的数据

```shell
pvmove /dev/sdd [/dev/sdc] # 导出到 /dev/sdc，也可以不添加第二个参数
```

###### 4 创建逻辑卷

[lvcreate 解释](https://blog.csdn.net/debimeng/article/details/72470030)  创建一个名为 '"mongolv" 的逻辑卷

```shell
# lvcreate -l 100%VG -n datalv datavg
# lvcreate mongovg -l 80%Free -n mongolv #80%空余
# lvcreate mongovg -L 5G -n mongolv      #5G的卷
lvcreate -l 6000 -n datalv datavg # 使用6000PE，大概 80%左右的容量
```

```shell
$> lvs #查看结果
LV     VG     Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  datalv datavg -wi-a----- <23.44g  
$> lvscan
ACTIVE   '/dev/datavg/datalv' [<23.44 GiB] inherit
```

> 这个USB有30G左右容量，创建一个 80%左右的逻辑卷，剩下的留给快照卷。

**4.1 LV 扩容**

```shell
vgs #查看vg是否还有剩余空间

lvextend -l 15  /dev/datavg/datalv   # 最终到15个LE
lvextend -l +15 /dev/datavg/datalv   # 加15个LE
```

以上只是逻辑卷扩容，但文件系统没有扩大，还需要对文件系统扩容

```shell
# xfs 格式
xfs_growfs /dev/datavg/datalv
# ext4 格式
resize2fs /dev/datavg/datalv
```



###### 5 格式化


```shell
mke2fs -t ext4 /dev/datavg/datalv
mkfs.ext4 /dev/datavg/datalv
mkfs.xfs /dev/datavg/datalv #也行
```

###### 6 挂载

（数据在哪里就挂载哪里）

```shell
mkdir /home/mongosnap
mount /dev/datavg/datalv /home/mongosnap
```

如果要开机就挂载

```shell
vim /etc/fstab
....
/dev/datavg/datalv /home/mongosnap ext4 defauts 0 0
```

```shell
$> df -Th
/dev/mapper/datavg-datalv ext4   30G   45M   28G   1% /home/mongosnap
```

> 显示的位置是`/dev/mapper/datavg-datalv`，但卸载时候要写 `umount /dev/datavg/datalv`



###### 7 使用 LVM 创建快照 snapshot

[创建快照](https://qastack.cn/ubuntu/424225/setting-up-lvm-snapshot-as-a-backup-restore-point-in-ubuntu)

```shell
# lvcreate -L 100M -n mdb-snap -s /dev/datavg/datalv
lvcreate -l 100%FREE -n mdb-snap -s /dev/datavg/datalv
# Logical volume "mdb-snap" created.
```

> 参数说明
>
> -s: snapshot 创建快照
>
> 对 datavg 下面的逻辑卷 datalv 进行快照，快照名称mb-snap

```shell
$> lvs
  LV       VG     Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  datalv   datavg owi-aos--- <23.44g                                                    
  mdb-snap datavg swi-a-s---  <6.56g      datalv 0.72  
$> lvscan
  ACTIVE   Original '/dev/datavg/datalv' [<23.44 GiB] inherit
  ACTIVE   Snapshot '/dev/datavg/mdb-snap' [<6.56 GiB] inherit
```

> 显示 datalv 是原始卷 'Original'，MdB-snap 是快照卷 Snapshot

挂载快照卷

```shell
mkdir /home/mb-01
mount -o ro /dev/datavg/mdb-snap /home/mb-01 
# xfs 格式的挂载要用参数 -o nouuid
```

> -o ro : 使用只读的方式将快照卷挂载到 /home/mb-01 
>
> 防止快照卷中的数据被破坏

查看挂载的信息

```shell
$> df -Th
/dev/mapper/datavg-datalv      23G   45M   22G   1% /home/mongosnap
/dev/mapper/datavg-mdb--snap   23G   45M   22G   1% /home/mb-01
```

> 注意到快照卷和原来卷的大小是一样的。其实只分配了 6G 的容量。



注意事项：

1. 快照卷与原卷必须在同一个VG里头。快照卷无需与原卷一样大，100M就OK

   

###### 快照备份

1. 全局读锁
2. lvm snapshot
3. 释放锁
4. mount -o snapshot
5. 从快照中复制出来
6. 卸载 snapshot
7. lvremove -f snapshot

[使用文件系统快照备份和还原](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/tutorial-backup-with-filesystem-snapshots.html)

使用SSD硬盘作为数据库数据，USB闪存备份。创建两个 VG

```shell
$> pvs
  PV         VG       Fmt  Attr PSize    PFree   
  /dev/sda1  datavg   lvm2 a--  <447.13g <447.13g # SSD 硬盘
  /dev/sdc1  backupvg lvm2 a--   <30.00g  <30.00g # USB 闪存
```

datavg 上创建一个逻辑卷 LV，剩余出 100GB 的容量作为快照

```shell
lvcreate -l 82000 -n datalv datavg # 320 作为数据库数据
lvcreate -l 100%VG -n backuplv backupvg
$> lvs
LV       VG       Attr       LSize    
  backuplv backupvg -wi-a----- <30.00g                                                    
  datalv   datavg   -wi-a----- 320.31g  
```

格式化这两个lv

```shell
mke2fs -t ext4 /dev/datavg/datalv
mke2fs -t ext4 /dev/backupvg/backuplv
```

挂载到文件系统中

```shell
mount /dev/datavg/datalv /home/mongodata
mount /dev/backupvg/backuplv /home/mongobackup
$> df -Th
/dev/mapper/datavg-datalv     ext4      315G   69M  299G   1% /home/mongodata
/dev/mapper/backupvg-backuplv ext4       30G   45M   28G   1% /home/mongobackup

$> vim /etc/fstab
/dev/datavg/datalv /home/mongodata   ext4 defauts 0 2
```

复制之前的文件到指定目录

```
tar -xzf /home/ubuntu/Backup/2021-07-16_mongo_all.tar.gz -C /
```

更改文件所有者，否则mongodb无法使用

```shell
ls -l /home/mongodata
chown -R mongodb:mongodb /home/mongodata/data
chown -R mongodb:mongodb /home/mongolog
```

制作快照

```shell
lvcreate -l 100%FREE -n mdb-snap -s /dev/datavg/datalv
$> lvs
  LV       VG       Attr       LSize    Pool Ori
  backuplv backupvg -wi-ao----  <30.00g                                                    
  datalv   datavg   owi-aos---  320.31g                                                    
  mdb-snap datavg   swi-a-s--- <126.82g      datalv 0.01 
```

将快照挂载到文件系统看看

```shell
mkdir /home/mb-snap
mount -o ro /dev/datavg/mdb-snap /home/mb-snap
```

```shell
$> df -Th
...
/dev/mapper/datavg-datalv     ext4      315G  1.5G  297G   1% /home/mongodata
/dev/mapper/backupvg-backuplv ext4       30G   45M   28G   1% /home/mongobackup
/dev/mapper/datavg-mdb--snap  ext4      315G  1.5G  297G   1% /home/mb-snap
```

###### 日常维护

查看快照卷实际使用情况，如果满了的话，要进行扩容

```
$> lvs
  LV       VG       Attr       LSize    Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  backuplv backupvg -wi-ao----  <30.00g                                                    
  datalv   datavg   owi-aos--- <397.13g                                                    
  mdb-snap datavg   swi-a-s---   50.00g      datalv 0.88    
```

> 上面例子：已经使用 Data% 的 0.88%



从文件系统中卸载快照卷，因为不需要它存在

```shell
umount /dev/datavg/mdb-snap
dd if=/dev/datavg/mdb-snap | gzip > /home/mongobackup/mdb-snap01.gz
```

bash 脚本

```shell
#!/bin/bash

# db.fsyncLock()
umount /dev/datavg/mdb-snap
lvremove -f /dev/datavg/mdb-snap
lvcreate -l 100%FREE -n mdb-snap -s /dev/datavg/datalv
# db.fsyncUnlock(); # 先解锁，然后慢慢备份
# umount /dev/datavg/mdb-snap
# dd if=/dev/datavg/mdb-snap | gzip > /home/mongobackup/mdb-snap`date +%F`.gz

mount /dev/datavg/mdb-snap /home/mb-snap
tar -czf /home/mongobackup/`date +%F`_mongo_all.tar.gz /home/mb-snap
```



当前文件结构

- /home/mongodata : SSD 硬盘，数据库数据
- /home/mongolog:    系统盘，存储数据库的日志文件
- /home/mb-snap:      SSD 硬盘，快照卷。这个文件系统平时不需要挂载。
- /home/mongobackup: USB 闪存，保存 2021-xx-xx.mongo.tar.gz 压缩文件