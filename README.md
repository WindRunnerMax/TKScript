# TKScript

<p>
<a href="https://github.com/WindrunnerMax/TKScript">GitHub</a>
<span>｜</span>
<a href="https://greasyfork.org/zh-CN/users/584991-windrunnermax">GreasyFork</a>
<span>｜</span>
<a href="https://addons.mozilla.org/en-US/firefox/addon/force-copy/">FirefoxAddOns</a>
<span>｜</span>
<a href="https://chromewebstore.google.com/detail/force-copy/cceclgeciefpanebkfkogecbjjchmico">ChromeWebStore</a>
<span>｜</span>
<a href="https://github.com/WindrunnerMax/TKScript/issues/131">BLOG</a>
</p>

`GreaseMonkey`油猴脚本与`BrowserAddon`浏览器扩展，如果觉得不错，点个`star`吧 😁  


## Install

使用油猴脚本需要首先安装`GreaseMonkey/TamperMonkey`扩展，版本库中有如下脚本，可以直接点击安装按钮进行安装，浏览器扩展程序直接在浏览器相关应用市场安装即可。

<table>
<thead>

<tr>
<th >名称</th>
<th >详情</th>
<th >安装</th>
<th >简介</th>
</tr>

</thead>
<tbody>

<tr>
<td>文本选中复制</td>
<td><a href="https://github.com/WindrunnerMax/TKScript/blob/master/packages/copy/README.md">详情</a></td>
<td>
<a href="https://windrunnermax.github.io/TKScript/copy.user.js">安装</a>
<span>｜</span>
<a href="https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@gh-pages/copy.user.js">备用</a>
</td>
<td>解除网站不允许复制的限制，需要适配新的网站可提<code>issue</code>。</td>
</tr>

<tr>
<td>文本选中复制-通用</td>
<td><a href="https://github.com/WindrunnerMax/TKScript/blob/master/packages/copy-currency/README.md">详情</a></td>
<td>
<a href="https://windrunnermax.github.io/TKScript/copy-currency.user.js">安装</a>
<span>｜</span>
<a href="https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@gh-pages/copy-currency.user.js">备用</a>
</td>
<td>文本选中复制通用处理版本，具体使用方式请查阅详情。</td>
</tr>

<tr>
<td>Force Copy</td>
<td><a href="https://github.com/WindrunnerMax/TKScript/blob/master/packages/force-copy/README.md">详情</a></td>
<td>
<a href="https://github.com/WindrunnerMax/TKScript/blob/master/packages/force-copy/README.md">安装</a>
<span>｜</span>
<a href="https://github.com/WindrunnerMax/TKScript/releases">备用</a>
</td>
<td>浏览器扩展程序，集成文本选中复制与通用能力。</td>
</tr>

<tr>
<td>跳转链接直达</td>
<td><a href="https://github.com/WindrunnerMax/TKScript/blob/master/packages/site-director/README.md">详情</a></td>
<td>
<a href="https://windrunnermax.github.io/TKScript/site-director.user.js">安装</a>
<span>｜</span>
<a href="https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@gh-pages/site-director.user.js">备用</a>
</td>
<td>去掉确定跳转链接页面，用于谷歌、知乎、<code>CSDN</code>、简书等。</td>
</tr>

<tr>
<td>自动展开阅读全文</td>
<td><a href="https://github.com/WindrunnerMax/TKScript/blob/master/packages/expansion/README.md">详情</a></td>
<td>
<a href="https://windrunnermax.github.io/TKScript/expansion.user.js">安装</a>
<span>｜</span>
<a href="https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@gh-pages/expansion.user.js">备用</a>
</td>
<td>展开阅读全文，用于<code>CSDN</code>、知乎等。</td>
</tr>

<tr>
<td>强智教务验证码识别</td>
<td><a href="https://github.com/WindrunnerMax/TKScript/blob/master/packages/captcha/README.md">详情</a></td>
<td>
<a href="https://windrunnermax.github.io/TKScript/captcha.user.js">安装</a>
<span>｜</span>
<a href="https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@gh-pages/captcha.user.js">备用</a>
</td>
<td>自动填写强智的验证码，请自行处理<code>@match</code>到匹配地址。</td>
</tr>


<tr>
<td>阿里图标库<code>HTTP</code></td>
<td><a href="https://github.com/WindrunnerMax/TKScript/blob/master/packages/completion/README.md">详情</a></td>
<td>
<a href="https://windrunnermax.github.io/TKScript/completion.user.js">安装</a>
<span>｜</span>
<a href="https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@gh-pages/completion.user.js">备用</a>
</td>
<td>添加<code>HTTP</code>按钮，简化手动填写。</td>
</tr>

</tbody>
</table>

## Release

如果需要从源码构建脚本与扩展，请使用`pnpm`安装依赖，如果不需要这步操作，可以直接在上方表格点击安装按钮即可安装打包好的脚本与扩展。版本库中`dist`为脚本打包目录，其中仅`copy`、`site-director`、`copy-currency`脚本需`rollup`打包使用，其他脚本直接安装即可。浏览器扩展的打包位置为各自`monorepo package`下的`build`目录，调试开发过程需要主动指定浏览器加载目标位置。

```bash
$ pnpm install
$ pnpm run build
$ pnpm run build:force-copy
$ pnpm run build:force-copy:gecko
```

## Contributors
<a href="https://github.com/WindrunnerMax/TKScript/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=WindrunnerMax/TKScript" />
</a>
