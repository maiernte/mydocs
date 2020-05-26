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

