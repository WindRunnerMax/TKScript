# TKScript

`TamperMonkey`油猴脚本，`GreasyFork`[主页链接](https://greasyfork.org/zh-CN/users/584991-windrunnermax)， 如果觉得不错，点个`star`吧 😃  


## 安装
使用油猴脚本需要首先安装`TamperMonkey`插件，也就是俗称油猴，请首先至主页安装`https://www.tampermonkey.net/index.php`。
* 文本选中复制: 源代码位于`src/copy`，。
* `src/copy-currency`: 文本选中复制，通用版。
* `src/expansion`: 自动展开阅读全文。
* `src/captcha`: 强智教务系统验证码识别。
* `src/site-director`: 去除链接跳转页面。
* `src/completion`: 阿里矢量图标库添加`HTTP`按钮。
## 打包
如果想`clone`版本库打包脚本，请使用`pnpm`。   
`dist`为打包目录，其中仅`copy`、`site-director`、`copy-currency`脚本需`rollup`打包使用，其他脚本引入即可。

```bash
$ pnpm install
$ pnpm run build
```
