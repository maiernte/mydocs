[翻墙指南](科技/others/翻墙指南.md)

[How to send SMS from Google Spreadsheet](https://www.twilio.com/blog/2016/02/send-sms-from-a-google-spreadsheet.html)

[卖卖资源的网站](https://www.hoocs.com/vitual-products/)

[Karabiner](科技/others/karabiner.md)

###### 个人WIKI

[docuwiki](https://www.dokuwiki.org/zh:install)

[Installing Dokuwiki on Ubuntu 18.04 with Nginx 官方文档](https://www.dokuwiki.org/install:ubuntu:ubuntu_18.04_nginx)

> ubuntu 18

```shell
sudo nginx -t -c dokuwiki.conf  # 测试配置文件是否有效
sudo nginx -t                   # 测试所有设置
```

[Config Multi Host](https://ubiq.co/tech-blog/configure-multiple-host-names-nginx/)



###### 安装服务器

[如何在 Ubuntu 20.04 上安装 Nginx](https://zhuanlan.zhihu.com/p/138007915)

> sudo ufw status 如果返回 Status: inactive，需要运行 `sudo ufw enable`

> [!note]
>
> 启动后加入 `sudo ufw allow ssh`，否则无法 ssh 登陆

[Nginx虚拟主机多host域名配置演示](https://blog.csdn.net/longgeqiaojie304/article/details/84984564)



###### Nginx

[nginx subdaomain](https://hackprogramming.com/how-to-setup-subdomain-or-host-multiple-domains-using-nginx-in-linux-server/)

[Installieren von Nginx unter Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04-quickstart-de)

[Subdomains mit NGINX anlegen und konfigurieren (Video)](https://www.youtube.com/watch?v=liA6Wg-mm2M)

> [!note]
>
> 安装这个包，并且在配置文件中设置 [说明文档](https://www.datadoghq.com/blog/nginx-502-bad-gateway-errors-php-fpm/)
>
> ```
> sudo apt -y install php7.4 php7.4-fpm
> ```



错误 `PHP function xml_parser_create .....`

> sudo apt-get install php-xml



###### 使用易学包

安装 inline js 和 MathJax 两个插件

```javascript
<PRELOAD>
https://raw.githack.com/maiernte/img/master/libs/bundle.js
</PRELOAD>
<JS>
document.addEventListener("DOMContentLoaded", function() {
  window.mathjaxHuahe();
});
</JS>

```

