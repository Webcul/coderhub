const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser');

const { userRouter, auth } = require('../router/index');
const errorHandle = require('./error-handle');
/*
* 顺序不能错 从上向下执行 ↓
* */
app.use(bodyparser()); // 解析json

// 动态注册路由
const useRoutes = require('../router');
useRoutes(app);

// 错误处理
app.on('error', errorHandle);

module.exports = app;