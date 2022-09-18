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
    // 修改动态
    async update(ctx, next) {
        // 1.获取当前动态id
        const id = ctx.params.momentId;
        // 2.动态内容
        const content = ctx.request.body.content;
        const res = await momentService.update(id, content);
        ctx.body = res;
    }
    // 删除动态
    async delMoment(ctx, next) {
        const id = ctx.params.momentId;
        const res = await momentService.delMoment(id);
        ctx.body = res;
    }
    // 添加标签
    async addLabels(ctx, next) {
        //1. 拿到标签和动态id
        const labels = ctx.labels;
        const { momentId } = ctx.params;
        console.log(momentId, labels)
        // 2. 添加所有标签
        for (let label of labels) {
            //2.1 判断标签是否已经和动态有关联
            const isExist =  await momentService.hasLabel(momentId, label.id);
            if (!isExist) {
                await momentService.addLabel(momentId, label.id);
            }
        }
        ctx.body = "添加标签成功";
    }
}

module.exports = new MomentController();