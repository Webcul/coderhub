const momentService = require('../service/momentService');
class MomentController {
    async create(ctx, next) {
        // 1. 获取数据 userID content
        const userId = ctx.user.id;
        const content = ctx.request.body.content;
        // 2.将数据插入到数据库
        const res = await momentService.create({userId, content});
        ctx.body = res;

    }
    //取单个用户动态
    async detail(ctx, next) {
        // 1. 获取数据（momentId）
        const momentId = ctx.params.momentId;
        // 2. 根据id查询数据
        const res = await momentService.getMomentById(momentId);
        ctx.response.body = res;
    }
    //取多个用户动态
    async list(ctx, next) {
    // 获取数据（offset/size） 页数/每页几条
        const { offest, size } = ctx.query;
        const res = await momentService.getMomentList(offest, size);
        ctx.body = res;
    }
}

module.exports = new MomentController();