这一版编译的 release 版本无法安装运行，只好先用 debug 版本改装

```bash
ionic cordova build android --prod
```

ionic 官方推荐的[签名示例](https://ionicframework.com/docs/deployment/play-store)在小米平台似乎有问题。但其它平台可以尝试。



##### 小米发布平台

在小米平台上创建的应用名为「华鹤易学」，包名为 「com.maiyongfenggooglemailcom.huaheweb」

1. 创建签名文件 

   [小米官方推荐的签名示例](https://dev.mi.com/console/doc/detail?pId=2085) 此例产生的签名文件放在 oss/huaheuser/app

   ```bash
   jarsigner -verbose -keystore xiaomi.keystore -signedjar app-release-unsigned.apk huaheapp
   # huaheapp pw123456
   ```

4. 对 apk 进行签名。不知为何在mac上按小米的方式无法签名。而按ionic官方的方式，却无法安装。幸好发现mac上编译的release版本，拿到windows上签名之后是可以使用的。

   ```bash
   jarsigner -verbose -keystore xiaomi.keystore -signedjar huaheyixueapp.apk app-release-unsigned.apk huaheapp
   ```

!> 不用上面那么麻烦，其实 release 版本是可以安装的，但之前需要签名。在 mac 上不知道为何无法签名，拿到windows 上签名就好了。




#####  Windows 上编译

在 windows 上编译的 release 版本可以运行，并且能够签名。以下是配置环境时需要的东西

- jdk 1.8.x 安装包：[下载地址](https://www.oracle.com/java/technologies/javase-jdk8-downloads.html) 
- 环境变量的配置，主要是 「JAVA_HOME」变量：[参考文章](https://www.tiagoporto.com/blog/environment-setting-tutorial-ionic-android-on-windows/)
- [Gradle 包下载地址](https://gradle.org/install/) （也要把路径加到系统 path 变量里头）

然后按照上面的签名，应该就可以了。

> 再编译时出现错误，执行删除 `ionic cordova platform rm android` ，然后再加进去 `ionic cordova platform add android`。记得拷贝图片 `ionic cordova resources android` 和确认 buffer 

