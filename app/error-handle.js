const errorTypes = require('../constants/error-types');
const errorHandle = (error, ctx) => {
    let status, msg;
    switch (error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400;
            msg = "用户名或密码不能为空";
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409;
            msg = "该用户名已注册";
            break;
        case errorTypes.USER_DOES_NOT_EXISTS:
            status = 400;
            msg = "该用户名不存在";
            break;
        case errorTypes.PASSWORD_IS_INCORRENT:
            status = 400;
            msg = "请输入正确的密码";
            break;
        case errorTypes.UNAUTHRIZATION:
            status = 401;
            msg = "无效token~";
            break;
        default:
            status = 404;
            msg = "NOT FOUND"
    }
    ctx.status = status;
    ctx.body = msg;
}

module.exports = errorHandle;