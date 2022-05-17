# TKScript

`TamperMonkey`油猴脚本，`GreasyFork`[主页链接](https://greasyfork.org/zh-CN/users/584991-windrunnermax)， 如果觉得不错，点个`star`吧 😃  


## Install

使用油猴脚本需要首先安装`TamperMonkey`拓展，也就是俗称的[油猴拓展](https://www.tampermonkey.net/index.php)，版本库中有如下脚本，可以直接点击安装按钮进行安装。

| 名称 | 详情 | 安装 | 简介 |
|----|----|----|----|
| 文本选中复制 | [详情](https://github.com/WindrunnerMax/TKScript/blob/master/src/copy/README.md) | [安装](https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/dist/copy.user.js)｜[备用]( https://raw.githubusercontent.com/WindrunnerMax/TKScript/master/dist/copy.user.js) | 解除网站不允许复制的限制，需要适配新的网站可提`issue`。 |
| 文本选中复制-通用 | [详情](https://github.com/WindrunnerMax/TKScript/blob/master/src/copy-currency/README.md) |  [安装](https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/dist/copy-currency.user.js)｜[备用]( https://raw.githubusercontent.com/WindrunnerMax/TKScript/master/dist/copy-currency.user.js) | 文本选中复制通用处理版本，具体使用方式请查阅详情。
| 跳转链接直达 | [详情](https://github.com/WindrunnerMax/TKScript/blob/master/src/site-director/README.md) |  [安装](https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/dist/site-director.user.js)｜[备用]( https://raw.githubusercontent.com/WindrunnerMax/TKScript/master/dist/site-director.user.js) | 去掉确定跳转链接页面，用于谷歌、知乎、CSDN、简书。 |
| 自动展开阅读全文 | [详情](https://github.com/WindrunnerMax/TKScript/blob/master/src/expansion/README.md) |  [安装](https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/src/expansion/expansion.user.js)｜[备用]( https://raw.githubusercontent.com/WindrunnerMax/TKScript/master/src/expansion/expansion.user.js) | 展开阅读全文，用于`CSDN`、知乎。 |
| 强智教务验证码识别 | [详情](https://github.com/WindrunnerMax/TKScript/blob/master/src/captcha/README.md) |  [安装](https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/src/captcha/captcha.user.js)｜[备用]( https://raw.githubusercontent.com/WindrunnerMax/TKScript/master/src/captcha/captcha.user.js) |  自动填写强智的验证码，请自行处理`@match`到匹配地址。|
| 阿里图标库`HTTP` | [详情](https://github.com/WindrunnerMax/TKScript/blob/master/src/completion/README.md) |  [安装](https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/src/completion/completion.user.js)｜[备用]( https://raw.githubusercontent.com/WindrunnerMax/TKScript/master/src/completion/completion.user.js) | 添加`HTTP`按钮，简化手动填写。  |



## Release

如果想`clone`版本库自行打包脚本，请使用`pnpm`，如果不需要这步操作，可以直接在上方表格点击安装按钮即可安装打包好的脚本。版本库中`dist`为打包目录，其中仅`copy`、`site-director`、`copy-currency`脚本需`rollup`打包使用，其他脚本直接安装即可。

```bash
$ pnpm install
$ pnpm run build
```
