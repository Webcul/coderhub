const Router = require('koa-router');

const commentRouter = new Router({prefix: '/moment'});

const { create, detail, list } = require('../controller/momentController');
const { verifyAuth } = require('../middleware/authMid');
// debugger;
commentRouter.post('/', verifyAuth, create);
commentRouter.get('/', list);
commentRouter.get('/:momentId', detail);

module.exports = commentRouter;