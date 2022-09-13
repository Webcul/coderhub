const service = require('../service/commentService')

class CommentController {
    // 创建评论
    async create(ctx, next) {
        const { content, momentId} = ctx.request.body;
        const userId = ctx.user.id;
        const res = await service.create(momentId, content, userId);
        ctx.body = res;
    };
    // 回复评论
    async reply(ctx, next) {
        const { content, momentId} = ctx.request.body;
        const commentId = ctx.request.params.commentId - 0;
        const userId = ctx.user.id;
        const res = await service.reply(content, momentId, userId, commentId);
        ctx.body = res;
    }
}

module.exports = new CommentController();