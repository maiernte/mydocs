[免费Mongodb](https://juejin.im/entry/5c9ce6556fb9a070f1259325) [菜鸟教程](https://www.runoob.com/mongodb/mongodb-tutorial.html)

在终端连接 `mongo`, 查看所有数据库 `show dbs`   [其它命令介绍](https://docs.mongodb.com/v3.6/tutorial/install-mongodb-on-ubuntu/)

创建管理员

```shell
use admin
db.createUser({user:'admin',pwd:'123456',roles:[{role:'userAdminAnyDatabase',db:'admin'}]})
show collections // 查看数据库内所有记录
```

如果希望从外网链接，需要设置配置文件 `vim etc/mongod.conf` 将 `bindIp: 127.0.0.1`  设置为 '0.0.0.0'。然后重启服务器

```
sudo systemctl start mongod
sudo systemctl status mongod
sudo systemctl stop mongod
sudo systemctl enable mongod // 重启服务器的时候启动数据库
```

查找冗余数据

```
db.HistoryData.aggregate([{
   '$group': {
        '_id': {'symbol': '$symbol','time': '$time'},
        'uniqueIds': {'$addToSet': '$_id'},
        'count': {'$sum': 1}}
    },{
        '$match': {'count': {'$gt': 1}
    }
}])
```

```

db.HistoryData.find({$and:[{symbol:'AAPL'},{time: new Date('2021-06-14')}]})
```

