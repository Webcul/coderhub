const Router = require('koa-router');

const labelRouter = new Router({prefix: '/label'});

const { create, list } = require('../controller/labelController')

const { verifyAuth } = require('../middleware/authMid');

// 创建标签
labelRouter.post('/', verifyAuth, create);

// 获取标签
labelRouter.get('/', list);

module.exports = labelRouter;