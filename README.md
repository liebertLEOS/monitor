# monitor
+服务端采用NodeJS+express+jade+mysql搭建  
+客户端引用了jquery2.1.4+echart2.0组件
## 完成进度
- [x] 每180秒采集一次数据，保存到数据库中
- [x] 浏览器端每3秒刷新一次实时数据
## 部署方法
1.本地已经部署号Nodejs、Mysql环境  
2.下载文件到本地  
3.执行data目录中的votenumber.sql语句  
4.修改src/app.js文件中数据库用户名和密码的配置
5.打开命令行工具，运行npm start  
6.打开浏览器，输入localhost
