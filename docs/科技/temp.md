随手摘成、思想火花。

生命没有剧本。


猜想：其实下面这个函数换成任何的 异步函数都可以，只要在 then() 中返回的不是 Promise.resolve()， 而是直接返回结果value 

```
function updateCacheForKey(key) {
    return fetch(/*...*/).then(result => {
        const value = result;
        cache[key] = value;
        return value;
    });
}
```

```
MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () { 
			MathJax.InputJax.TeX.prefilterHooks.Add(function (data) {  
				var tex = huaheformat(data.math);
				var pattern = /(?<express>\\[a-zA-Z0-9]+)\{/;
				var macro = tex.match(pattern);
				var key = macro ? macro.groups["express"] : "";
				var func = dictYiXue[key];
				if (func) {
						data.math = func(tex);
				} else {
						console.error('tex', tex)
				}
			}); 
		});
```

Sample alert using type NOTE

> [!note]
> An alert of type 'note' using global style 'callout'. `[!NOTE]`


Sample alert using type TIP

> [!tip]
> An alert of type 'tip' using global style 'callout'. `[!TIP]`


Sample alert using type WARNING

> [!warning]
> An alert of type 'warning' using global style 'callout'.`[!WARNING]`



Sample alert using type DANGER

> [!danger]
> An alert of type 'danger' using global style 'callout'.`[!DANGER]`
Step #3 - docsify commands
