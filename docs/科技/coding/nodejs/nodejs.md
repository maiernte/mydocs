#### Mocha/Chai Unit-Test

[how to automate node test with mocha chai](https://buddy.works/guides/how-automate-nodejs-unit-tests-with-mocha-chai)

[mock request response](https://itnext.io/mocking-expressjs-request-and-response-objects-63405e9c58ff) 

[npm mock-req-response](https://www.npmjs.com/package/mock-req-res)



[showdown convert md to html](https://github.com/showdownjs/showdown)

[markdown-it](https://github.com/markdown-it/markdown-it)

##### Find unused npm

`npm install depcheck -g`

`depcheck`



###### Install on Ubuntu

```shell
sudo apt update
sudo apt install nodejs
sudo apt install npm
nodejs -v
```

forever 后台运行 Node.js 服务

```shell
//全局安装
npm install forever -g 
//启动       
forever start app.js 
//关闭         
forever stop app.js           
//输出日志和错误
forever start -l forever.log -o out.log -e err.log app.js
//自动监控文件变化，文件修改保存之后自动重启app.js      
forever -w app.js  
//查看帮助           
forever -h  

# 启动
forever start ./bin/www     #简单的启动
forever start -l forever.log ./bin/www   #指定forever日志输出文件，默认路径~/.forever
forever start -l forever.log -a ./bin/www  #需要注意，如果第一次启动带日志输出文件，以后启动都需要加-a 参数，forever默认不覆盖原文件
forever start -o out.log -e err.log ./bin/www #指定node.js应用的控制台输出文件和错误信息输出文件
forever start -w ./bin/www   #监听当前目录下文件改动，如有改动，立刻重启应用（不推荐，如有日志文件，日志文件是频繁更改的）
 
#重启
forever restart ./bin/www   #重启单个应用
forever restart [pid] #根据pid重启应用
forever restartall # 重启所有应用
 
 
#停止
forever stop ./bin/www   # 停止单个应用
forever stop [pid] #根据pid停止单个应用
forever stopall #停止所有应用
 
#查看forever守护的应用列表
forever list
```

