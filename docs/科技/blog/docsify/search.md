###### 参考文献

[Gulp 使用详解](https://neveryu.github.io/2017/05/01/gulp/) / [gulp 快速入门](https://www.gulpjs.com.cn/docs/getting-started/quick-start/) / [gulp 使用插件](https://www.gulpjs.com.cn/docs/getting-started/using-plugins/)

[优化 docsify 搜索功能](https://juejin.cn/post/6908620673275396104) / [备用文章](https://kebingzao.com/2020/09/30/docsify-search/)

参考第一篇文章，在 index.html 所在目录下安装 gulp

```
npm install --save-dev gulp
```

并且创建一个 gulpfile.js 文件，将代码拷贝进去。然后执行 `gulp` 命令就好了

```shell
npm install
gulp
```

> 有个需要注意的问题是，我的网站将设置文件写到了 `_libs/init.js` 下面。需要将js文件的代码迁移到 index.html 文件当中。并且在 `path: []` 之前加入 `/*gulp*/` ，让脚本知道在这个地方填充。

有新内容以后，运行一次gulp脚本就能将新的内容填充进去。



###### IndexDB 替换 localStorage

LocalStorage 只有5MB 的存储容量，而 IndexDB有250MB。察看方式，打开 Chrome 的开发者工具中的 Application 标签。

```javascript
<script> //查看localstorage的剩余容量
  (function(){
    if(!window.localStorage) {
        console.log('浏览器不支持localStorage');
    }
      var size = 0;
      for(item in window.localStorage) {
          if(window.localStorage.hasOwnProperty(item)) {
              size += window.localStorage.getItem(item).length;
          }
      }
      console.log('当前localStorage剩余容量为' + (size / (1024*1024)).toFixed(2) + 'MB');
  })()
</script>
```



替代的代码， 在Chrome的控制台中初始化数据库

```js
window.initialDB()
// window.readDB('docsify.search.expires')
```



```
var db;
  
  function addToDB(col, key, data) {
    var request = db.transaction([col], 'readwrite')
      .objectStore(col)
      .add({index: key, value: data});
  
    request.onsuccess = function (event) {
      console.log('数据写入成功');
    };
  
    request.onerror = function (event) {
      console.log('数据写入失败');
    }
  }

  function readFromDB(col, key) {
    var transaction = db.transaction([col]);
    var objectStore = transaction.objectStore(col);
    var request = objectStore.get(key);

    request.onerror = function(event) {
      console.log('事务失败');
    };

    return new Promise((resolve, reject)=>{
      request.onsuccess = function( event) {
        if (request.result) {
          var v = request.result.value
          resolve(v)
        } else {
          console.log('未获得数据记录');
          resolve(null)
        }
      };
    })
  }

  window.initialDB = async function initialDB(){
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      addToDB('indexkey', key, value)
    }
  }

  window.readDB = async function ReadKeyValue(key){
    var res = await readFromDB('indexkey', key)
    console.log(`Key (${key}) = ${res}`)
  } 

  function createIndexDBTable(){
    var indexStore;
    if (!db.objectStoreNames.contains('indexkey')) {
      indexStore = db.createObjectStore('indexkey', { keyPath: 'index' });
      indexStore.createIndex('index', 'index', { unique: true });
      console.log('创建数据库 indexkey')
    }
  }

  var indexDB = window.indexedDB.open('searchindex', 3);
  indexDB.onerror = function (event) {
    console.log('IndexDB 数据库打开报错');
  };
  indexDB.onsuccess = function (event) {
    db = indexDB.result;
    console.log('IndexDB 数据库打开成功');
  };
  indexDB.onupgradeneeded = function (event) {
    db = event.target.result;
    console.log('IndexDB 数据库升级');
    createIndexDBTable()
  }
```

