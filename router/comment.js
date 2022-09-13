const Router = require('koa-router');
const commentRouter = new Router({prefix: '/comment'});

const { create, reply } = require('../controller/commentController');
const { verifyAuth } = require('../middleware/authMid');

commentRouter.post('/', verifyAuth, create);
commentRouter.post('/:commentId/reply', verifyAuth, reply);

module.exports = commentRouter;