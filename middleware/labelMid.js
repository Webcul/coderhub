const service = require('../service/labelService');
const verifyLabelsExists = async (ctx, next) => {
    //1. 取出要添加的标签
    const { labels } = ctx.request.body;
    //2.判断每个标签在label表中是否存在
    const newLabels = [];
    for (let name of labels) {
        const labelRes = await service.isLabelExist(name);
        const label = {name};
        if(!labelRes) {
            // 不存在标签就创建, 创建后拿到结果中的insertId，和动态id进行关联
            const res = await service.create(name);
            label.id = res.insertId;
        } else {
            label.id = labelRes.id;
        }
        newLabels.push(label);
    }
    ctx.labels = newLabels;
    console.log(ctx.labels);
    await next();
}

module.exports = {
    verifyLabelsExists,
}