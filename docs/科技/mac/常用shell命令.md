

##### shell 命令

###### nohup 及输出命令到文件

1指标准输出；2指错误输出，所以写成这样：command 1>output 2>error & ，正常的输出在output文件里，错误的输出在error文件里,command >output 2>error &

(1可以省略)

忽略错误输出：command 1>output 2>/dev/null & 

忽略标准输出：command 1>/dev/null 2>error &

忽略全部输出：command 1>/dev/null 2>/dev/null &

**忽略全部输出**：`command >/dev/null 2>&1 &`

错误输出和标准输出在一个文件：command 1>output 2>&1 &

错误输出和标准输出在一个文件：command 1>output 2>output & （X这种方式错误）



这样的文件输出，每次运行会覆盖现有的文件，如果我们希望追加而不是覆盖，那么就用>>符号，这样命令就是： command 1>>output 2>>error &

如果想退出窗口乃至退出登录仍然保持程序运行，再加上nohup，形如：nohup command 1>output 2>&1 &

 

nohup sh run.sh 1>run_info.log 2>run_error.log &



###### 隐藏文件夹

Terminal 命令

```bash
//显示隐藏文件
defaults write com.apple.finder AppleShowAllFiles -bool true
//不显示隐藏文件
defaults write com.apple.finder AppleShowAllFiles -bool false
```

!> 快速命令，打开访达窗口，然后 **⌘ + ⇧ + .**  就可以隐藏/显示。



###### 任务控制

- 将任务放在后台运行：`command + &` 
- 将任务丢到后台暂停：`ctrl-z` 
- 查看后台所有任务状态：`jobs -l`  (会列出 1、2、3序列号)
- 将后台的任务拿到前台处理：`fg %jobnumber`  (指序列号，而不是任务id)
- 将后台的任务变成运行中：`bg %jobnumber` 
- 管理后台当中的任务：`kill -signal %jobnumber`



##### 通过Automator添加快捷键

[文章来源](https://zhidao.baidu.com/question/1514898183998822540.html)

1. 一次打开 ***Finder —> 应用程序 —> automator***
2. 选取 ***服务***
3. 从左边的双栏选取 ***使用工具—>运行AppleScript***， 并双击运行。
4. 出现文本框后选定（右栏最上边）***没有输入***

```objective-c
on run {input, parameters}
    (* Your script goes here *)
    tell application "Safari"
        reopen
        activate
        end tell
end run
```

5. ⌘+S 保存，命名为 *Open Safari*。关闭automator
6. 转到 ***系统偏好设置—>键盘—>快捷键—>服务—>通用—>open safari*** ，然后设定快捷键就好了。