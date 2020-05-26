以上的流程走通后其实已经可以预览到书了，但是打开控制台后会发现滑动页面的时候会报错`theme.js:4 Uncaught TypeError: Cannot read property 'split' of undefined`

**下面是具体解决步骤:**

1. 进入 GitBook 默认主题所在的文件夹

`.gitbook`文件如果默认安装的话，我的Mac上是在`‎⁨Macintosh HD⁩ ▸ ⁨用户⁩ ▸ ⁨aro⁩`，我的Windows上是在`C:\Users\Aro`，这个文件是被系统隐藏了，Mac下快捷键`command+shift+.`，Windows下显示隐藏的文件如下图

![20190812gitbook02](https://zhouhongyu.top/img/20190812gitbook02.jpg)

`.gitbook` -> `versions` -> `3.2.3` -> `node_modules` -> `gitbook-plugin-theme-default` -> `src` -> `js` -> `theme` -> `navigation.js` 找到`getChapterHash`函数

```javascript
function getChapterHash($chapter) {
    var $link = $chapter.children('a'),
        hash = $link.attr('href').split('#')[1];

    if (hash) hash = '#'+hash;
    return (!!hash)? hash : '';
}
```

1. 将该函数修改为下面的形式:

```
function getChapterHash($chapter) {
    var $link = $chapter.children('a'),
        hash,
        href,
        parts;

    if ($link.length) {
        href = $link.attr('href')
        if (href) {
            parts = href.split('#');
            if (parts.length>1) {
                hash = parts[1];
            }
        }
    }

    if (hash) hash = '#'+hash;
    return (!!hash)? hash : '';
}
```

1. 回到 `gitbook-plugin-theme-default` 文件夹，运行 `npm install` 重新编译文件。
2. 至此问题解决

