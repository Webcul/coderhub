const connection = require('../app/database');
class LabelService {
    // 创建标签
    async create(tagName) {
        try {
            const statement = `INSERT INTO label(NAME) VALUES(?);`;
            const [res] = await connection.execute(statement, [tagName]);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    // 判断标签是否存在
    async isLabelExist(tagName) {
        const statement = `select id from label where name = ?`;
        const [res] = await connection.execute(statement, [tagName]);
        return res[0];
    }
    // 获取标签
    async getLabelList(limit, offset) {
        const statement = `select * from label limit ?, ?`;
        const [res] = await connection.execute(statement, [offset, limit]);
        return res;
    }
}


module.exports = new LabelService();