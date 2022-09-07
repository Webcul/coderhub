class AuthController {
    async login(ctx, next) {
        ctx.body = "登陆成功";
        await next();
    }
}

module.exports = new AuthController();