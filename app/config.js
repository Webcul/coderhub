const dotenv = require('dotenv');

const fs = require('fs');

// 调用config方法时全局process.env中就存在APP_PORT这个变量了
dotenv.config();

// 公钥私钥
let PRIVATE_KEY = fs.readFileSync('./private.key');
let PUBLIC_KEY = fs.readFileSync('./public.key');

// console.log(process.env.APP_PORT)
module.exports = {
    APP_PORT,
} = process.env;

// 一定要写在后面，不然会被前面覆盖
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;