const Router = require('koa-router');
const commentRouter = new Router({prefix: '/comment'});

const { create, reply, update, remove, list } = require('../controller/commentController');
const { verifyAuth, verifyUserPermit } = require('../middleware/authMid');

// 发表评论
commentRouter.post('/', verifyAuth, create);
commentRouter.post('/:commentId/reply', verifyAuth, reply);

// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyUserPermit, update)
// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyUserPermit, remove);
// 拿评论信息
commentRouter.get('/', list)

module.exports = commentRouter;