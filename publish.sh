#!/bin/bash
set -ex

npx rollup -c
cp ./packages/expansion/expansion.user.js ./dist/expansion.user.js
cp ./packages/captcha/captcha.user.js ./dist/captcha.user.js
cp ./packages/completion/completion.user.js ./dist/completion.user.js
cp ./README.md ./dist/README.md
