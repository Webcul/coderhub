/*
* 登录授权
* */
const service = require('../service/userService');
const authService = require('../service/authService');
const errorType = require('../constants/error-types');

// jwt校验
const jwt = require('jsonwebtoken');
const { PUBLIC_KEY } = require('../app/config');

const _md5 = require('../utils/_md5');

const verifyLogin = async (ctx, next) => {
    // 1.获取用户名密码
    const { name, password} = ctx.request.body;
    // 2. 校验用户名密码是否为空
    if(!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }
    // 3. 判断用户是否存在
    const res = await service.getUserByName(name);
    const user = res[0];
    if (user.length <= 0) {
        const error = new Error(errorType.USER_DOES_NOT_EXISTS);
        return ctx.app.emit('error', error, ctx);
    }
    // 4. 判断密码是否和数据库中的密码是否一致
    if (_md5(password) !== user.password ) {
        const error = new Error(errorType.PASSWORD_IS_INCORRENT);
        return ctx.app.emit('error', error, ctx);
    }
    ctx.user = user;
    await next();
}

// 验证授权
const verifyAuth = async (ctx, next) => {
    // 1.获取token
    const authorization = ctx.headers.authorization || '';
    const token = authorization.replace("Bearer", "").trimStart();
    // 2. 验证token(id/name/iat/exp)
   try {
       const result = jwt.verify(token, PUBLIC_KEY, {
           algorithms: ['RS256'],
       });
       ctx.user = result;
       await next(); // 验证token成功后再next
   } catch (e) {
       const error = new Error(errorType.UNAUTHRIZATION);
       ctx.app.emit("error", error, ctx);
   }

}

// 验证用户权限(设计的更有通用性)
/*
* 业务接口
* issue: 这里需要一个表名作为参数。
* 实现方式一： 将verifyUserPermit变成一个函数，用闭包思想做
* 实现方式二：接口是按照restful风格写的，修改接口后面跟`${表名}Id`，这样就可以获取到表名
* */
// const verifyUserPermit = (tableName) => {
//     return async (ctx, next) => {
//         console.log('验证权限的中间件')
//         const userId = ctx.user.id;
//         const id = ctx.params.momentId;
//         try {
//             const isPermission = await authService.checkResource(tableName, userId, id);
//             if (!isPermission) throw new Error();
//             await next();
//         } catch (err) {
//             const error = new Error(errorType.UNPERMISSION);
//             ctx.app.emit('error', error, ctx);
//         }
//     }
// }
const verifyUserPermit = async (ctx, next) => {
    console.log('验证权限的中间件')
    const userId = ctx.user.id;

    const [resourceKey] = Object.keys(ctx.params);
    const tableName = resourceKey.replace('Id', '');

    const id = ctx.params[resourceKey];

    try {
        const isPermission = await authService.checkResource(tableName, userId, id);
        if (!isPermission) throw new Error();
        await next();
    } catch (err) {
        const error = new Error(errorType.UNPERMISSION);
        ctx.app.emit('error', error, ctx);
    }
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyUserPermit,
}