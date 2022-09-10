/*
* 登录授权
* */
const Router = require('koa-router');

const authRoute = new Router();

const { login, suceed } = require('../controller/authController.js');
const { verifyLogin, verifyAuth } = require('../middleware/authMid');

authRoute.post('/login', verifyLogin, login);
// 验证授权接口
authRoute.get('/test', verifyAuth, suceed);

module.exports = authRoute;
