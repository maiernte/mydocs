#### Install

`npm install mongodb`

#### Find with limit & skip

If I understand your question, you need to sort in ascending order.

Assuming you have some id or date field called "x" you would do ...

###### .sort()

------

```js
db.foo.find().sort({x:1});
```

The **1** will sort ascending (oldest to newest) and **-1** will sort descending (newest to oldest.)

If you use the auto created **_id** field it has a date embedded in it ... so you can use that to order by ...

```js
db.foo.find().sort({_id:1});
```

That will return back all your documents sorted from oldest to newest.

###### Natural Order

------

You can also use a [Natural Order](http://www.mongodb.org/display/DOCS/Sorting+and+Natural+Order) mentioned above ...

```js
db.foo.find().sort({$natural:1});
```

Again, using **1** or **-1** depending on the order you want.

###### Use .limit()

------

Lastly, it's good practice to add a limit when doing this sort of wide open query so you could do either ...

```js
db.foo.find().sort({_id:1}).limit(50);
```

or

```js
db.foo.find().sort({$natural:1}).limit(50);
```

###### skip

The last **N** added records, from less recent to most recent, can be seen with this query:

```js
db.collection.find().skip(db.collection.count() - N)
```

If you want them in the reverse order:

```js
db.collection.find().sort({ $natural: -1 }).limit(N)
```

If you install [Mongo-Hacker](http://tylerbrock.github.io/mongo-hacker/) you can also use:

```js
db.collection.find().reverse().limit(N)
```

If you get tired of writing these commands all the time you can create custom functions in your ~/.mongorc.js. E.g.

```js
function last(N) {
    return db.collection.find().skip(db.collection.count() - N);
}
```

###### summary

you can use `sort()` , `limit()` ,`skip()` to get last N record start from any skipped value

```js
db.collections.find().sort(key:value).limit(int value).skip(some int value);

db.products.createIndex( { "category": 1, "item": 1 } )
```



Connection

```
user: xxxx
pw: xxxx

db.command( { createRole: 'SOME_ROLE', privileges: [], roles: [] } )
```



##### MongoDB

APP-ID: huahe-hfqpu



## App ID

```
huahe-hfqpu
```

 COPY



- JS (Browser)
- Java (Android)
- Swift (iOS)

## Importing on a Webpage

#### Insert this line in your `**HEAD**`  near the top in a webpage.

```
<script src="https://s3.amazonaws.com/stitch-sdks/js/bundles/4.6.0/stitch.js"></script>
```

 COPY

## Example Snippet

#### Try including this snippet in an HTML file on your site. Be sure to replace the placeholder variables.

```
<script src="https://s3.amazonaws.com/stitch-sdks/js/bundles/4.6.0/stitch.js"></script>
<script>
  const client = stitch.Stitch.initializeDefaultAppClient('huahe-hfqpu');

  const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'huaheservice').db('<DATABASE>');

  client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(user =>
    db.collection('<COLLECTION>').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
  ).then(() =>
    db.collection('<COLLECTION>').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
  ).then(docs => {
      console.log("Found docs", docs)
      console.log("[MongoDB Stitch] Connected to Stitch")
  }).catch(err => {
    console.error(err)
  });
</script>
```



## NPM

#### You can also install the Stitch Browser SDK client with NPM.

```
npm install --save mongodb-stitch-browser-sdk@"^4.6.0"
```



## Example Snippet

#### Try the following code in a script that you are bundling to a frontend JavaScript application. Be sure to replace the placeholder variables.

```
const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

const client = Stitch.initializeDefaultAppClient('huahe-hfqpu');

const db = client.getServiceClient(RemoteMongoClient.factory, 'huaheservice').db('<DATABASE>');

client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
  db.collection('<COLLECTION>').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
).then(() =>
  db.collection('<COLLECTION>').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
).then(docs => {
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
    console.error(err)
});
```



###### Call Function

```
const client = Stitch.defaultAppClient;
client.callFunction("sum", [3, 4]).then(result => {
    console.log(result) // Output: 7
});
```



###### 匹配查找

```javascript
db.users.find({"name": /m/})
db.users.find({"name": /.*m.*/})
```


