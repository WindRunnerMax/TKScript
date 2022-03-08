# TKScript

`TamperMonkey`油猴脚本，`GreasyFork`[主页链接](https://greasyfork.org/zh-CN/users/584991-windrunnermax)， 如果觉得不错，点个`star`吧 😃  


## 打包
如果想`clone`版本库自行打包脚本，请使用`pnpm`，如果不需要这步操作，可以直接在下方表格点击安装按钮即可安装打包好的脚本。   
版本库中`dist`为打包目录，其中仅`copy`、`site-director`、`copy-currency`脚本需`rollup`打包使用，其他脚本直接安装即可。

```bash
$ pnpm install
$ pnpm run build
```

## 安装

使用油猴脚本需要首先安装`TamperMonkey`拓展，也就是俗称的[油猴拓展](https://www.tampermonkey.net/index.php)，版本库中有如下脚本，可以直接点击安装脚本按钮进行安装。

| 名称 | 详情 | 安装 | 简介 |
|---|---|---|---|
| 文本选中复制 | [详细信息](https://github.com/WindrunnerMax/TKScript/blob/master/src/copy/README.md) | [安装脚本](https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/dist/copy.user.js) |  `src/copy`: 用于解除网站不允许复制的限制，文本选中后点击复制按钮即可复制，主要用于百度文库、道客巴巴、无忧考网、学习啦、蓬勃范文、思否社区、力扣、知乎、语雀等等。|
| 文本选中复制-通用版 | [详细信息](https://github.com/WindrunnerMax/TKScript/blob/master/src/copy-currency/README.md) |  [安装脚本](https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/dist/copy-currency.user.js) | `src/copy-currency`: 文本选中复制通用处理版本，适用于大多数网站，具体使用方式请查阅详细信息链接，该脚本可与文本选中复制共存。请注意，某度文库、道客某某等网站不能通用处理，请使用文本选中复制脚本。 |
| 跳转链接直达 | [详细信息](https://github.com/WindrunnerMax/TKScript/blob/master/src/site-director/README.md) |  [安装脚本](https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/dist/site-director.user.js) | `src/site-director`:  ，去掉确定跳转链接页面，用于谷歌、知乎、CSDN、简书。 |
| 自动展开阅读全文 | [详细信息](https://github.com/WindrunnerMax/TKScript/blob/master/src/expansion/README.md) |  [安装脚本](https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/src/expansion/expansion.user.js) | `src/expansion`: 展开阅读全文，用于`CSDN`、知乎。 |
| 强智教务系统验证码识别 | [详细信息](https://github.com/WindrunnerMax/TKScript/blob/master/src/captcha/README.md) |  [安装脚本](https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/src/captcha/captcha.user.js) | `src/captcha`: 自动填写强智的验证码，请自行处理`@match`到需要匹配的网站。 |
| 阿里矢量图标库添加`HTTP`按钮 | [详细信息](https://github.com/WindrunnerMax/TKScript/blob/master/src/completion/README.md) |  [安装脚本](https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/src/completion/completion.user.js) | `src/completion`: 添加`HTTP`按钮，简化手动填写。 |



