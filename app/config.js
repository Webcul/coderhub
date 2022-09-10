const dotenv = require('dotenv');

// 调用config方法时全局process.env中就存在APP_PORT这个变量了
dotenv.config();
console.log(process.env.APP_PORT)
module.exports = {
    APP_PORT,
} = process.env;
