const userService = require('../service/userService');
class UserController {
    async create(ctx, next) {
        // 获取用户请求传递来的参数
        const user = ctx.request.body;
        // 查询数据（代码量多 做抽离）service/
        const result = await userService.create(user);
        // 返回数据
        ctx.body = result;
    }
}

module.exports = new UserController;