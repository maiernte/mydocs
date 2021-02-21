[使用文档：Use more complex rules](https://karabiner-elements.pqrs.org/docs/manual/configuration/configure-complex-modifications/)

[Karabiner Configuration Reference Manual](https://karabiner-elements.pqrs.org/docs/json/)

> 里面讲解了简单例子，以及json文件的组织形式等。



###### Mac系统下引入了两个方案，能解决日式键盘箭头和字符键的冲突。

- [Change option](https://ke-complex-modifications.pqrs.org/?q=umlaut) + a/o/u to ä/ö/ü
- [German Mapping](https://ke-complex-modifications.pqrs.org/?q=German%20mapping) for programming / \ { } [ ] ~

> 第二个方案的时候，md 文档的列表符号 “ - ” 需要 Alt + ä, Alt + Empty 两步完成。
>
> 或者使用 Fn + -_ 也可以
>
> 使用第二个方案后就完全可以把箭头空出来使用。



##### 案例：

###### 德语键盘注释

**问题**：很多coding的注释都是`// (slash) ` 符号，在编辑器上使用组合键 `comand + /` 能实现整段注释。 但是德语键盘的slash符号要 `shift + 7`。使用 `command + shift + 7` 的时候就丧失了原有的注释功能。

**解决方案**：通过 karabiner 组合键映射，将  `command + shift + 7` 映射为 `command + slash` 。这样就能实现在代码编辑器上整段注释的功能。

> 缺点：要使用中文输入法的时候，这段功能才有效。因为德语键盘的 slash 对应的是其它符号。中文键盘与英文键盘的布局是差不多的，这样才能实现所需功能。

```
{
	"title": "德语键盘修改",
	"rules": [
		{
      "description": "注释功能键",
      "manipulators": [
      	{
	        "type": "basic",
	        "from": {
	            "key_code": "k",
	            "modifiers": {
	                "mandatory": ["control", "command"],
	                "optional": ["any"]
	            }
	        },
	        "to": [
	            {
	                "key_code": "slash",
									"modifiers": ["command"]
	            }
						]
      	}
      ]  
		}
	]
}
```

