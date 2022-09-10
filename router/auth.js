/*
* 登录授权
* */
const Router = require('koa-router');

const authRoute = new Router();

const { login } = require('../controller/authController.js');
const { verifyLogin } = require('../middleware/authMid');

authRoute.post('/login', verifyLogin, login);

module.exports = authRoute;
