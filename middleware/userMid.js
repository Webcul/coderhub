const errorType = require('../constants/error-types');
const service = require('../service/userService');

const _md5 = require('../utils/_md5');

const verifyUser = async (ctx, next) => {

    // 1. 获取用户名和密码
    const { name, password } = ctx.request.body;
    // 2. 判断用户名密码不为空
    if(!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }

    //3. 判断此用户名是否已经注册（异步）
    const result = await service.getUserByName(name);
    console.log(result.length)
    if (result.length > 0) {
        const error = new Error(errorType.USER_ALREADY_EXISTS);
        return ctx.app.emit('error', error, ctx);
    }
    // 下个中间件里有异步操作，要等到这个异步操作执行完之后再执行后面的，不然会有问题
    // 这个地方要等到最后的代码执行完之后在这返回结果。
    await next();
}

// 密码加密
const encrypt = async (ctx, next) => {
    const { password } = ctx.request.body;
    ctx.request.body.password = _md5(password); // md5加密
    // console.log(ctx.request.body.password)
    await next();
}
module.exports = {
    verifyUser,
    encrypt
}