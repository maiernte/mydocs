###### 参考文献

[Gulp 使用详解](https://neveryu.github.io/2017/05/01/gulp/) / [gulp 快速入门](https://www.gulpjs.com.cn/docs/getting-started/quick-start/) / [gulp 使用插件](https://www.gulpjs.com.cn/docs/getting-started/using-plugins/)

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

