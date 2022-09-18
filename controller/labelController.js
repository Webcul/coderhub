const service = require('../service/labelService');
class LabelController {
    // 创建标签
    async create(ctx, next) {
        const {tagName} = ctx.request.body;
        const res = await service.create(tagName);
        ctx.body = res;
    }
    // 获取标签
    async list(ctx, next) {
        const { limit, offset } = ctx.query;
        const res = await service.getLabelList(limit, offset);
        ctx.body = res;
    }
}

module.exports = new LabelController();