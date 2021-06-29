[翻墙指南](科技/others/翻墙指南.md)

[How to send SMS from Google Spreadsheet](https://www.twilio.com/blog/2016/02/send-sms-from-a-google-spreadsheet.html)

[卖卖资源的网站](https://www.hoocs.com/vitual-products/)

[Karabiner](科技/others/karabiner.md)

[Raspberry](科技/others/rashbarry.md)



后台执行 `./ngrok tcp 22 --log=./ngrok.log > /dev/null &`

`jobs -l` #查找刚才启动的服务并处理[参阅](https://maiernte.github.io/wiki/mac-memo.html)

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



