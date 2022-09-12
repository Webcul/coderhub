const Router = require('koa-router');

const commentRouter = new Router({prefix: '/moment'});

const { create, detail, list, update, delMoment } = require('../controller/momentController');
const { verifyAuth, verifyUserPermit } = require('../middleware/authMid');
// debugger;
commentRouter.post('/', verifyAuth, create);
commentRouter.get('/', list);
commentRouter.get('/:momentId', detail);

// 1.用户登录 2.用户获取权限
commentRouter.patch('/:momentId', verifyAuth, verifyUserPermit, update);
commentRouter.delete('/:momentId', verifyAuth, verifyUserPermit, delMoment);

module.exports = commentRouter;