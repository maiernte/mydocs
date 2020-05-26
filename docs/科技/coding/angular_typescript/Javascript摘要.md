### Promise

##### 输出链条

文档 [Promises chaning](https://javascript.info/promise-chaining) 

:pencil2: 可以在 `then` 函数里面跑出 结果 `或者` 第二个 `Promise` 



### Node.js 坚果云

```javascript
const request =  require('request')
username = "meerbusch@sina.com"
password = "awisqg23vwgxyxwn"
auth = "Basic " + Buffer.from(username + ":" + password).toString("base64");
url = 'https://dav.jianguoyun.com/dav/我的坚果云/dritteanwendung/test.txt'
var options = { method: 'GET',
  url: encodeURI(url),
  'proxy':'http://f040371:1Todayfine$$$@proxy-rzf:8080',
  headers: { authorization: auth } };
request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

上传文件，使用 8进制流 `Content-Type: application/octet-stream` 

Node.js 实现方式， 要使用 **PUT** 方法

```
var http = require("https");

var options = {
  "method": "PUT",
  "hostname": "dav.jianguoyun.com",
  "port": null,
  "path": "/dav/%E6%88%91%E7%9A%84%E5%9D%9A%E6%9E%9C%E4%BA%91/dritteanwendung/test2.txt",
  "headers": {
    "authorization": "Basic bWVlcmJ1c2NoQHNpbmEuY29tOmF3aXNxZzIzdndneHl4d24=",
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
    "postman-token": "8c9d0f9b-6e2f-5787-8f05-50bbe3fca892"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
```



[String Compress](https://github.com/pieroxy/lz-string/)

[pako js](https://github.com/nodeca/pako/tree/master/dist)

[Node.js with  SQLite](https://stackabuse.com/a-sqlite-tutorial-with-node-js/)

[单独的SQLite 文件](https://github.com/kripken/sql.js/)



[check script loaded](https://stackoverflow.com/questions/9521298/verify-external-script-is-loaded/9521360)



##### 3D

`<script src="//cdn.rawgit.com/mrdoob/three.js/master/build/three.min.js"></script>`

[three.js](https://stackoverflow.com/questions/11060734/how-to-rotate-a-3d-object-on-axis-three-js)



[Ionic Animation](https://ionicframework.com/docs/utilities/animations)

```html
<html>
  <head></head>
  <body>
    <div class="square"></div>
      
    <button id="play">Play</button>
    <button id="pause">Pause</button>
    <button id="stop">Stop</button>
  </body>
</html>
```

```css
.square {
  width: 100px;
  height: 100px;
  background: rgba(0, 0, 255, 0.5);
  margin: 10px;
}
```

```javascript
import { createAnimation } from 'https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/esm/index.mjs';

const animation = createAnimation()
   .addElement(document.querySelector('.square'))
   .duration(200)
   .iterations(Infinity)
   .fromTo('transform', 'rotateY(0deg)', 'rotateY(180deg)')
   .fromTo('opacity', '1', '1');

document.querySelector('#play').addEventListener('click', () => {
  animation.play();
});

document.querySelector('#pause').addEventListener('click', () => {
  animation.pause();
});

document.querySelector('#stop').addEventListener('click', () => {
  animation.stop();
});
```

