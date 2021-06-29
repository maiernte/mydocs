

[资源储备](科技/金融项目/资源.md)

[量化交易一些资料](经济/股市/量化交易/)

[TradingView 图表文档](https://zlq4863947.gitbook.io/tradingview/home)



##### 内网穿透

网云穿比较慢，SSH连接可以接受。而且地址是固定的。以后用网云穿使用ssh管理服务器，动态的ngrok地址就在网站中使用。

###### 网云穿

 [网云穿](https://www.xiaomy.net/pay?type=1) （*终身版1M不限流量339元*）/  [linux 安装](http://neiwangchuantou.cn/archives/8.html) / [后台运行](http://neiwangchuantou.cn/archives/4.html)

```shell
nohup ./wyc_linux_arm -token=****** &
tail -f nohup.out
ssh user@xxxx.dongtaiyuming.net -p <portnumber>
```

###### Ngrok

[NGROK 公网IP](https://ngrok.com/pricing)  

后台执行 `./ngrok tcp 22 --log=./ngrok.log > /dev/null &`

`jobs -l` #查找刚才启动的服务并处理[参阅](https://maiernte.github.io/wiki/mac-memo.html)  ngrok.log 日志文件查看随机分配的接口

```shell
ngrok by @inconshreveable               (Ctrl+C to quit)
                                                                                        
Session Status                online                                                    
Account                       maiernte (Plan: Free)                                     
Version                       2.3.40                                                    
Region                        United States (us)                                        
Web Interface                 http://127.0.0.1:4040                                     
Forwarding                    tcp://6.tcp.ngrok.io:10622 -> localhost:22                
                                                                                        
Connections                   ttl     opn     rt1     rt5     p50     p90               
                              0       0       0.00    0.00    0.00    0.00    
```

从外部连接 `$ ssh user@2.tcp.ngrok.io -p 10622`


