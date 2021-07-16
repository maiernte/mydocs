 [MongoDB](科技/coding/database/MongoDB.md) 

[MongoDB 优化高级篇](https://www.jianshu.com/p/b77a33fbe824)

[内存管理](https://ghost.atibm.com/mongodb-dui-nei-cun-de-yan-zhong-zhan-yong-yi-ji-jie-jue-fang-fa/)

[迁移数据目录](科技/coding/database/迁移数据目录.md)  /  [数据备份](科技/coding/database/backupdata.md)

```shell
db.setProfilingLevel(1) # 0代表关闭，1代表记录慢命令，2代表全部
db.system.profile.find({millis:{$gt:500}}) #查询时间在500毫秒以上的查询
```

mongodb的WT引擎默认占用一半内存做缓存，看看你的内存消耗超过50%没？没超过就是在正常范围内。如果你希望限制这个内存大小，配置cacheSizeGB这个参数即可： [https://docs.mongodb.com/manu...](https://docs.mongodb.com/manual/reference/configuration-options/#storage-wiredtiger-options)

```
   wiredTiger:
      engineConfig:
         cacheSizeGB: <number>
```



###### 启动失败解决方案

```shell
chown -R mongodb:mongodb /var/lib/mongodb/
sudo chown mongodb:mongodb /tmp/mongodb-33720.sock
sudo systemctl restart mongod
```

