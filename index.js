// 引入KOA实例
const app =require('./app');
require('./app/database'); // 加载数据库相关
// const { APP_PORT } = require('./app/config');

app.listen(8000, () => {
    console.log('start~');
})