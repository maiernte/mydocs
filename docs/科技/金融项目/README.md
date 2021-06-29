

[资源储备](科技/金融项目/资源.md)

[量化交易一些资料](经济/股市/量化交易/)

[TradingView 图表文档](https://zlq4863947.gitbook.io/tradingview/home)



##### 内网穿透

###### 网云穿

 [网云穿](https://www.xiaomy.net/pay?type=1) （*终身版1M不限流量339元*）/  [linux 安装](http://neiwangchuantou.cn/archives/8.html) / [后台运行](http://neiwangchuantou.cn/archives/4.html)

```
nohup ./wyc_linux_arm -token=****** &
tail -f nohup.out
ssh root@3ms4sg23.dongtaiyuming.net -p 16774
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



ssh 反向代理其实用不着，搞一个免费的公网IP就可以了。在前台服务器上拉取每日数据、映射端口、以及提供简单的服务。

树莓提供一个Http服务给VPS，VPS做完每日基本工作后，通过http服务通知树莓。树莓从VPS上更新每日数据，然后进行算法运算。

外网要读取股市数据时，首先查看前台服务器是否有临时备份。有就直接提供。没有就将访问传导到树莓的web服务上（注意分配tocken）。这样树莓每个月的数据流量其实不会很高的。免费的公网ip完全搞定。而且也不需要固定地址，因为理论上只要前台VPS知道地址就可以了。