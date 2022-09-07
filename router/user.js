//引入路由
const Router = require('koa-router');
// 创建用户路由
const userRouter = new Router({prefix: '/users'});

const { create } = require('../controller/user')
const { verifyUser, encrypt }  =require('../middleware/userMid');
/*
* 只注册接口，具体的处理逻辑抽取出去
* userRouter.post('/', 具体处理逻辑);
* */
userRouter.post('/',verifyUser, encrypt, create); // 执行sql之前要对用户进行校验，so，增加中间件

module.exports = userRouter;