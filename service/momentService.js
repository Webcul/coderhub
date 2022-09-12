const connection = require('../app/database');

class momentService {
    // 用户新增动态
    async create(moment) {
        const { userId, content } = moment;
        const statement = `INSERT INTO moment(content, user_id) VALUES(?, ?);`;
        const res = await connection.execute(statement, [content, userId], (error) => {
            console.log(error);
        })
        return res[0];
    }
    // 获取单个用户动态
    async getMomentById(id) {
        const statement = `SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, JSON_OBJECT('id', u.id, 'name', u.name) user
                            FROM moment m LEFT JOIN user u on m.user_id = u.id WHERE m.user_id = ?;`;
        const res = await connection.execute(statement, [id]);
        return res[0];
    }
    // 获取所有用户动态
    async getMomentList(offest, size) {
        const statement = `SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, JSON_OBJECT('id', u.id, 'name', u.name) user
                            FROM moment m LEFT JOIN user u on m.user_id = u.id limit ?, ?;`;
        const res = await connection.execute(statement, [offest, size]);
        return res[0];
    }
    // 更新动态
    async update(id, content) {
        try {
            const statement = `UPDATE moment SET content = '${content}' WHERE id = ${id};`;
            const [res] = await connection.execute(statement);
            // console.log(res);
            return res;
        } catch (e) {
            console.log(e)
        }
    }
    // 删除动态
    async delMoment(id) {
       try {
           const statement = `DELETE FROM moment WHERE id = ?;`;
           const [ res ] = await connection.execute(statement, [id]);
           return res;
       } catch (e) {
           console.log(e);
       }
    }
}

module.exports = new momentService();