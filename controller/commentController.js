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
    // 修改评论
    async update(ctx, next) {
        const { commentId } = ctx.params;
        const { content } = ctx.request.body;
        const res = await service.update(commentId, content);
        ctx.body = res;
    }
    // 删除评论
    async remove(ctx, next) {
        const { commentId } = ctx.params;
        const res = await service.remove(commentId);
        ctx.body = res;
    }
    // 获取评论接口
    async list(ctx, next) {
        const {momentId} = ctx.query;
        const res = await service.getCommentByMomentId(momentId);
        ctx.body = res;
    }
}

module.exports = new CommentController();