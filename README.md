# TKScript

`TamperMonkey` 油猴插件，`GreasyFork`[主页链接](https://greasyfork.org/zh-CN/users/584991-windrunnermax)。

* `dist`: 打包后模块
* `src/copy`: 文本选中复制
* `src/expansion`: 自动展开阅读全文
* `src/captcha`: 强智教务系统验证码识别
* `src/site-director`: 去除链接跳转页面
* `src/completion`: 阿里矢量图标库添加`HTTP`按钮

`copy`脚本需`rollup`打包使用，其他脚本引入即可
```shell
npm install
npm run build
```