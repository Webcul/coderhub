const Router = require('koa-router');
const commentRouter = new Router({prefix: '/comment'});

const { create, reply, update, remove } = require('../controller/commentController');
const { verifyAuth, verifyUserPermit } = require('../middleware/authMid');

commentRouter.post('/', verifyAuth, create);
commentRouter.post('/:commentId/reply', verifyAuth, reply);

// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyUserPermit, update)
// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyUserPermit, remove);

module.exports = commentRouter;