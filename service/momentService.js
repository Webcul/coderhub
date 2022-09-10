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
        console.log(res);
        return res[0];
    }
}

module.exports = new momentService();