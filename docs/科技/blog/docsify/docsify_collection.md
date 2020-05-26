#### 问题集

###### 全文搜索找不到记录

发现跟 _sidebar.md 里的设置以及文档标题有关。侧栏要使用列表模式，即是 `- [mac](path/about_mac.md)` 这样的格式。并且在 md 文档里面要用 `h1` ～ `h5` 开头。具体请参看本站源代码。

此例，文档入口如果位于侧栏的第三级，文档内容最好从 h4 开始。

###### 中文路径

标准版本的docsify不能解释中文路径，这个很麻烦。需要下载源代码，并修改的路径的解释

```javascript
// const hash = router.toURL(router.getCurrentPath())
const hash = decodeURI(router.toURL(router.getCurrentPath()))
```



#### 部署

###### Zeit 服务器
-  [用Now轻松部署无服务器Node应用程序](https://wemp.app/posts/8ad78d3c-82b9-42b9-837a-920c42841ccc?utm_source=latest-posts)

###### 本地部署

1. 进入目录，运行项目 `docsify serve`

2. `⌃ + z ` 将任务放到后台，这时候它是暂停的。并且显示任务号

    `[1]+  Stopped docsify serve` ( "1" 就是任务号 )

3. 在终端输入 `bg %1` 运行任务

4. `jobs -l` 显示后台的任务， `fg %nr` 将任务拉到前台，然后可以将其终止。



#### 维护

###### 编写与更新

添加 [Edit on Github](https://github.com/njleonzhang/docsify-edit-on-github) 插件

> 注意 js 文件的引用要放在 header，否则配置插件的时候有可能找不到，因为还没有加载。

在线修改完以后，在本地编辑以前要更新在线的版本。

```javascript
//拉取在线版本
git pull 
// 对比在线与本地版本
git diff origin/master 
```



#### Edit-on-Github 插件

通过改装 Edit-On-Github 插件，使得 docsify 在本地部署的时候，能直接打开文档进行修改。而无需通过访达或者文件管理器。因为 docsify 是一个web 应用，出于安全性的保护，无法直接访问磁盘上的文件，也不能很方便的启动本地应用。需要用到一个 node.js 项目 [open](https://www.npmjs.com/package/open)，通过它间接打开本地应用。

思路是建一个 node 服务，运行在本地。并公布一个 web 地址，让 docsify 通过 GET/POST 触发，从而打开需要修改的文件。

###### 客户端

直接修改Edit-On-Github 插件，先添加一个函数，编辑一个带参数的 WEB 地址，用于触发node服务

```javascript
function buildUrl(fileurl, app) {
  let body = {
  	para: fileurl, // 文件在网站上的相对对路径
  	application: app // 编辑器的名称，如 'typora' 或者 'vscode'
  };

  // let params = encodeURIComponent(JSON.stringify(body));
  let params = window.btoa(JSON.stringify(body));
  let url = `http://localhost:3001/lauch?params=${params}`
  return url 
}
```

修改原插件的 “editDoc” 函数

```javascript
function editDoc(event, vm) {
      var docName = vm.route.file
      if (docName) {
        var host = win.location.host;
        var localhost = host != docEditBase
        if (localhost) {
          var fileUrl = buildUrl(docName, 'typora')
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open( "GET", fileUrl, false ); // false for synchronous request
          xmlHttp.send( null );
          console.log('xmlHttp', xmlHttp.responseText)
        } else { 
          // 原来的代码，用于在 Github 上编辑
          var editLink = docEditBase + docName
          window.open(editLink)
        }
        
        event.preventDefault()
        return false
      } else {
        return true
      }
    }
```

###### 服务端

以下代码是关键的部分，整个node服务的搭建，请移步Github仓库中查看: [localservice](https://github.com/maiernte/localservice) 

```javascript
var cp = require("child_process");
const open = require('open');
const ROOT_Docsify = '/Users/mai/projects/tianyawiki/docs/'
function atobUTF8(b64Encoded) {
  return Buffer.from(b64Encoded, 'base64').toString('utf8');
}
```

解释客户端发送的参数，也就是文件路径和Editor的名称

```javascript
function parsereRequestURL(resq) {
  return new Promise((resolve, reject) => {
    try {
      let queries = resq.query || resq.queries
      let txt = atobUTF8(queries.params)
      let body = JSON.parse(decodeURI(txt))
      body.para = ROOT_Docsify + body.para
      return resolve(body) // 得到整个参数
    }catch(err){
      return reject(err)
    }})}
```

```javascript
// npm i open --save
const open = require('open');
open(fileUrl, {app: application})
```

最后启动 docsify 和 MarkdownEditor 服务程序，并让其在后台运行。

```javascript
// 启动服务器，并放到后台
bash -c "nohup sh -c 'node pathTo/app.js' &"
// 启动 docsify, 并放到后台
bash -c "nohup sh -c 'docsify serve pathTo/docs/' &"
```


###### 字符串编码

客户端与服务器之间的编码统一


```javascript
// 客户端/浏览器 编码
b64Encoded = window.btoa('text')
// node 服务器 解码
pretxt = Buffer.from(b64Encoded, 'base64').toString('utf8');
```

如果客户端的 “text” 中含有中文字符，需要先变异成地址字符串 `encodeURI('text')`。

服务端再解码 `decodeURI(pretxt)`

"window" 对象的各种接口

[DOM Window API](https://www.w3schools.com/jsref/obj_window.asp)



#### 嵌入Gist代码

[参考文档](https://gist.github.com/MichaelCurrin/c2bece08f27c4277001f123898d16a7c)    [官方文档：文件嵌入](https://docsify.js.org/#/zh-cn/embed-files)

1. 嵌入代码 (e.g. mai.js)

   ```
   // 即是显示 raw 的那个地址。
   [LABEL](//gist.githubusercontent.com/USERNAME/GIST_ID/raw/FILENAME ':include :type=code')
   ```

2. 嵌入 md 文档

   ```
   [LABEL](//gist.githubusercontent.com/USERNAME/GIST_ID/raw/FILENAME ':include')
   ```

!> 例子：`[FILENAME](./gitbook集锦.md ':include')  ` 当中那个 `.md` 不可以省略，也不可以从根目录开始，要写相对路径。`并且要顶格开始`。

?> 可以利用这个技巧，前面空一格，就变成链接。顶格就变成嵌入。

#### 心得

侧栏和导航栏配合使用，会使得网站结构非常简洁明了。导航栏放置大的结构，侧栏则显示具体文章的结构。在需要定制化的子目录放置自己的侧栏文档。

如果结构化了以后，最好关掉"sidebar-collapse"插件。

```
alias: {
    '/.*/_sidebar.md': '/_sidebar.md'
  },
```


