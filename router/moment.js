const Router = require('koa-router');

const momentRouter = new Router({prefix: '/moment'});

const { create, detail, list, update, delMoment, addLabels } = require('../controller/momentController');
const { verifyAuth, verifyUserPermit } = require('../middleware/authMid');
const { verifyLabelsExists } = require('../middleware/labelMid');
// debugger;
momentRouter.post('/', verifyAuth, create);
momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);

// 1.用户登录 2.用户获取权限
momentRouter.patch('/:momentId', verifyAuth, verifyUserPermit, update);
momentRouter.delete('/:momentId', verifyAuth, verifyUserPermit, delMoment);

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyUserPermit, verifyLabelsExists, addLabels);

module.exports = momentRouter;