###### 正则表达式匹配中文字符

```
匹配中文字符的正则表达式：    [\u4e00-\u9fa5]
匹配双字节字符(包括汉字在内)：[^\x00-\xff]
```



##### Javascript

通用性匹配例子

```javascript
var pattern = /\\gua64\{(?<name>[\S]+)\}(\{(?<arg>[^\{^\}]*)\})?/
var match = arg.match(pattern)
var name = match.groups["name"]
```

替换字符

```javascript
// 将所有 【、「、《 全部替换成 "{"
let out = tex.replace(/【|《|「/g, '{')
```

查找字符

```javascript
const index = 'some Text'.sarch(regex);
```



##### 修改EPUB文件

将文件后缀改为zip文档，然后解压。用VSCode打开。针对里面的html文件进行修改。完成后在主目录内将所有子目录和文件重新压缩到一个zip文件中，然后改名为epub就可以了。



用VSCode查找的时候要点开`.*`选项，才能进行匹配查询。



###### 页码的位置

```html
<br/>\n		[0-9]+<br/>\n<br/>
```

其效果大概如

> some Text
>
>   19
>
> in two site.



```javascript
// 查找:"(\w)" 将作为第一参数在替换中使用
(\w)<br/>\n<br/>\n\t\t[0-9]+<br/>\n<br/>\n	

// 替换
$1空空   
```



##### Word文档

回车符是  

```
^p 
^|
```

