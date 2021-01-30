
##### 博客管理

 [docsify管理](科技/blog/docsify/docsify管理.md) 

[给Hexo博客加广告](https://www.jianshu.com/p/774dfc1c2fb1)   [接入谷歌广告](https://darylliu.github.io/archives/6a1f6623.html)

Markdown 内嵌入大的代码，可以将其放到 https://gist.github.com 上面，然后在MD 文件中用 iframe 使用。



###### Gitbook 和 docsify 的跳转链接

Gitbook 中的写法请参阅 [Gitbook 锚点](科技/blog/gitbook/gitbook集锦#锚点) 。而 docsify 的实现方式更简洁方便，假设有关文件位于 `docsify_roo/科技/blog/gitbook集锦.md` 下，并且有一个 Heading 为 "锚点"。[docsify 锚点](科技/blog/docsify/docsify_collection#嵌入gist代码) 跳转的方式就可以是

```html
[点击我跳转](科技/blog/gitbook集锦#锚点)
```



###### 图片处理

将图片拉到md文档以后，选择复制到 `~\img_github\bilder`，然后将地址改为

`https://github.com/maiernte/img/raw/master/bilder/`

如果是docsify项目内，也可以复制到 `_bilder\`。不需要有目录结构和分别整理，这样会增加工作量。

如果使用 `![](../path/pic.jpeg)` 的方式，需要从子目录回溯到上级目录。

采用HTML方式 `<img src="path/_pic.jpeg" style="zoom: 50%;" />`只需从根目录开始写就行。