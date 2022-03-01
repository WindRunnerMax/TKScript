# TKScript



`TamperMonkey`油猴脚本，`GreasyFork`[主页链接](https://greasyfork.org/zh-CN/users/584991-windrunnermax)， 如果觉得不错，点个`star`吧 😃  

* `dist`: 打包后模块。
* `src/copy`: 文本选中复制。
* `src/expansion`: 自动展开阅读全文。
* `src/captcha`: 强智教务系统验证码识别。
* `src/site-director`: 去除链接跳转页面。
* `src/copy-currency`: 文本选中复制，通用版。
* `src/completion`: 阿里矢量图标库添加`HTTP`按钮。

`copy`、`site-director`、`copy-currency`脚本需`rollup`打包使用，其他脚本引入即可。

```bash
$ pnpm install
$ pnpm run build
```
