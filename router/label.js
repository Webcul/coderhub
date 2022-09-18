const Router = require('koa-router');

const labelRouter = new Router({prefix: '/label'});

const { create } = require('../controller/labelController')

const { verifyAuth } = require('../middleware/authMid');

// 创建标签
labelRouter.post('/', verifyAuth, create);

module.exports = labelRouter;