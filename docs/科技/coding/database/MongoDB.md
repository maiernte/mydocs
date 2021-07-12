[免费Mongodb](https://juejin.im/entry/5c9ce6556fb9a070f1259325) / [菜鸟教程](https://www.runoob.com/mongodb/mongodb-tutorial.html) / [防止数据库被黑](https://zhuanlan.zhihu.com/p/37837627) / [搭建副本](https://jelly.jd.com/article/5f990ebbbfbee00150eb620a)

在终端连接 `mongo`, 查看所有数据库 `show dbs`   [MongoDB 4.4 安装](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

[搭建副本步骤](科技/coding/database/搭建副本.md)

创建管理员

```shell
use admin
db.createUser({user:'admin',pwd:'123456',roles:[{role:'userAdminAnyDatabase',db:'admin'}]})
show collections // 查看数据库内所有记录
```

如果希望从外网链接，需要设置配置文件 `vim /etc/mongod.conf` 将 `bindIp: 127.0.0.1`  设置为 '0.0.0.0'， `auth=true`。然后重启服务器

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
}]).forEach(function(it){
     it.uniqueIds.shift();
        db.DataH.remove({_id: {$in: it.uniqueIds}});
}); //后面部分是删除冗余的数据
```

```

db.HistoryData.find({$and:[{symbol:'AAPL'},{time: new Date('2021-06-14')}]})
```

索引

```
db.collection.createIndex(keys, options)
db.col.createIndex({"title":1})
db.col.createIndex({"title":1,"description":-1})
db.col.getIndexes()
db.col.totalIndexSize()
db.col.dropIndexes()
db.col.dropIndex("索引名称")
```

获取最新日期的某个股票数据

```javascript
var mach = [{$match: {symbol:symbol}}, {$sort: {time: -1}}, {$limit: 1}]
await this.db.Aggregate('Stock', 'DataD', mach)
// db.collection(collection).aggregate(match).toArray()
```

计算某个股票最新和最长久数据

```javascript
var list:Array<AnyObject> = await db.collection(collection).aggregate([
{ $match :  match},
{
  $group:{
    _id: null,
    max: { $max: '$'+`${key}` },
    min: { $min: '$'+`${key}`}
  }
}
]).toArray()
```

查询某个日期以后的数据

```javascript
await this.db.Request(database, collectionD, {$and: [{symbol:symbol}, {time: {$gte: maxOfAll.max}}]})
```

```javascript
// 统计所有股票，总共有多少记录，最久的一个记录发生在哪天.
var match:any = [
{ $match :  {symbol: symbol}},
{
	$group:{
		_id: symbol,
		count: { $sum: 1 },
		min: { $min: '$time'}
	}
}]
var data: any = await this.db.Aggregate('Stock', 'DataD', match)
```

###### 压缩数据

[compact 文档](https://docs.mongodb.com/manual/reference/command/compact/) / [repairDatabase 文档](https://docs.mongodb.com/manual/release-notes/4.2-compatibility/#remove-support-for-the-repairdatabase-command/)  / [比较Compact和repaireDatabase](https://dba.stackexchange.com/questions/68370/huge-size-on-mongodbs-gridfs-should-i-compact) 例子：

```shell
 // compact oplog，execute the force option on the copy set primary
 use local
 db.runCommnd({compact: "somecollection", force: true})
```



