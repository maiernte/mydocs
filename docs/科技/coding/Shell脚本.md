# 题目
历遍目录。如果用户不输入就取当前目录。

例子 [参考](https://www.jianshu.com/p/edbdff7a83c9)


```sh
# Commit
echo "请输入要查找的目录:"

# 等待用户输入, “D:\\Aufgaben”
read dir

# 当用户输入的时候，[ -z $dir ] 会报错
if [ -z "$dir" ];
then
	# $dir 是空字符串。 
	echo "您没有输入，默认为当前目录: " `pwd`
	# 赋值符"="周围不能有任何空格，否则出错
	# 如果是“比较”操作，等号两边就要空格。
	dir=`pwd`
else
	echo "您输入的目录为 ${dir}"
fi

echo "回车执行历遍。输入'q'退出"
read do_it


# 原先写 [ $do_it = "q" ] ， 但系统报错。
# 究其原因，是因为如果变量STATUS值为空，那么就成了 [ = "q"] ，显然 [ 和 "q" 不相等并且缺少了 [ 符号，所以报了这样的错误。当然不总是出错，如果变量STATUS值不为空，程序就正常了，所以这样的错误还是很隐蔽的。
# [ $do_it = "q" ] 要改为 [ "$do_it" = "q" ]
if [ "$do_it" = "q" ];
then
	exit 0
else
	echo "run..."
fi


# 递归历遍目录
function listFiles()
{
        #1st param, the dir name
        #2nd param, the aligning space
        for file in `ls $1`;
        do
                if [ -d "$1/$file" ]; then
                    echo "$2$file"
                    listFiles "$1/$file" "   $2"
                else
                    echo "$2$file"
                fi
        done
}

listFiles $dir ""

echo "....finished."
read 
```

`code`

> hier kann man code schreiben
>
> `> sed i 'command' file.txt`
>
> `>  grep com`
>
> **asdfasd** 
>
> ``d code ``



short code is OK!

```
# 避免只有一行的代码区，因为会显示滚动条，不好看。一行代码就用行内代码好了。
```



读取数据库

[shell中读取mysql数据库](http://mingxinglai.com/cn/2013/01/use-mysql-in-shell/)

<details>
<summary>数据库script</summary>

```sh
#!/bin/bash

# Connection
host="localhost"
port="3306"
userName="etv"
password="etv"
dbname="etv"
dbset="--default-character-set=utf8 -A"

cmd_show_tables="show tables"

#echo "show tables"
#mysql -h${host} -u${userName} -p${password} ${dbname} -P${port} -e  "${cmd_show_tables}"
result=""

# echo "show users"
cmd_users="select userName from user"
# mysql -h${host} -u${userName} -p${password} ${dbname} -P${port}  -e "${cmd_users}" 


MYSQL=mysql

# $MYSQL -hlocalhost -uetv -petv etv  <<EOF 2>/dev/null
	# show tables;
# EOF


$MYSQL -hlocalhost -uetv -petv etv <<EOF
	show databases;
	show tables;
	${cmd_users}
EOF

echo "finished."

read
```
</details>
<br>
<script src="https://gist.github.com/maiernte/d2cdf04780b575fe9705204b6f0fbef8.js"></script>
```

```