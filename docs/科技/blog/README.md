
##### 博客管理

 [docsify管理](科技/blog/docsify/docsify管理.md) 

Markdown 内嵌入大的代码，可以将其放到 https://gist.github.com 上面，然后在MD 文件中用 iframe 使用。



###### Gitbook 和 docsify 的跳转链接

Gitbook 中的写法请参阅 [Gitbook 锚点](科技/blog/gitbook/gitbook集锦#锚点) 。而 docsify 的实现方式更简洁方便，假设有关文件位于 `docsify_roo/科技/blog/gitbook集锦.md` 下，并且有一个 Heading 为 "锚点"。[docsify 锚点](科技/blog/docsify/docsify_collection#嵌入gist代码) 跳转的方式就可以是

```html
[点击我跳转](科技/blog/gitbook集锦#锚点)
```

