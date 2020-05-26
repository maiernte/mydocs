###### 文章&工具

[Gitbook常用的插件](https://segmentfault.com/a/1190000019806829)



###### 目录跳转

两个目录可以分别跳转到同一篇MD文档的不同**Heading**，例如 README.md 中有两个章节

```
# 卷一
	...
## 八卦章第一
```

目录可以如以下写法，注意不用特别设置id，就是 heading 的题目文字就好。

```
* [卷一](chapter1/README.md#卷一)
  * [八卦章一](chapter1/README.md#八卦章第一)
```

###### 锚点

在文字中设置一个锚点，前面添加的 `<a class="anchorjs-link">` 是为了能前面显示链接的图标。

```html
<a class="anchorjs-link " href="#占父" aria-label="Anchor link for: 用神章第八" data-anchorjs-icon="" style="font-family: anchorjs-icons; font-style: normal; font-variant: normal; font-weight: normal; line-height: inherit; position: absolute; margin-left: -1em; padding-right: 0.5em;"></a>

例:辰月戊申日占父近病，得乾为天变风天小畜。<a id='占父'></a> 

```

假设上面例子位于文件 `chapter1/用神章.md` 的 Heading `#### 用神章第八`，跳转处写法

- **写法 1** 

​    

```html
[例5：占父] (../chapter1/用神章.html#占父)
```

其实际的地址为 `https://localhost:3000/chapter1/用神章.html#占父` 

- **写法 2**

```html
[例3：乾为天] (../chapter1/#乾为天)
```

同样可以实现跳转。



###### 修改注脚

- 在项目中创建 **_layouts->website->summary.html**

- [summary.html](https://gist.github.com/maiernte/0fb80adf7f75f1fc4252bf0c4c020ba8) ([raw code](https://gist.githubusercontent.com/maiernte/0fb80adf7f75f1fc4252bf0c4c020ba8/raw/e0007eeff818afccbd5d6cd4c0c030beb6d66b83/summary.html))内容如下 (注释掉或者换掉这一段)

  

```html
<li>
  <a href="https://www.gitbook.com" target="blank" class="gitbook-link">
  	{{ "GITBOOK_LINK"|t }}
  </a>-->
</li>
```



<script src="https://gist.github.com/maiernte/0fb80adf7f75f1fc4252bf0c4c020ba8.js"></script>
这段代码在 docsify 中太占地方，如果要显示的话，在 md 文件中写 ([详情参阅 : docsify 如何嵌入 gist 代码](科技/blog/docsify_collection#嵌入gist代码))

```html
[LABEL](//gist.githubusercontent.com/maiernte/0fb80adf7f75f1fc4252bf0c4c020ba8/raw/e0007eeff818afccbd5d6cd4c0c030beb6d66b83/summary.html ':include :type=code') 
```

