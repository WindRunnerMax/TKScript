module.exports = {
    "printWidth": 100, // 指定代码长度，超出换行
    "tabWidth": 4, // tab 键的宽度
    "useTabs": false, // 不使用tab
    "semi": true, // 结尾加上分号
    "singleQuote": false, // 使用单引号
    "quoteProps": "preserve", // 不要求对象字面量属性是否使用引号包裹
    "jsxSingleQuote": false, // jsx 语法中使用单引号
    "trailingComma": "es5", // 确保对象的最后一个属性后有逗号
    "bracketSpacing": true, // 大括号有空格 { name: 'rose' }
    "jsxBracketSameLine": false, // 在多行JSX元素的最后一行追加 >
    "arrowParens": "avoid", // 箭头函数，单个参数不强制添加括号
    "requirePragma": false, // 是否严格按照文件顶部的特殊注释格式化代码
    "insertPragma": false, // 是否在格式化的文件顶部插入Pragma标记，以表明该文件被prettier格式化过了
    "proseWrap": "preserve", // 按照文件原样折行
    "htmlWhitespaceSensitivity": "ignore", // html文件的空格敏感度，控制空格是否影响布局
    "endOfLine": "lf" // 结尾是 \n \r \n\r auto
}