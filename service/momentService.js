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
        const statement = `SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
                            JSON_OBJECT('id', u.id, 'name', u.name) USER,
                            JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)) labels
                            FROM moment m 
                            LEFT JOIN USER u ON m.user_id = u.id
                            LEFT JOIN moment_label ml ON ml.moment_id = m.id
                            LEFT JOIN label l ON ml.label_id = l.id
                            WHERE m.id = ?;`;
        const res = await connection.execute(statement, [id]);
        return res[0];
    }
    // 获取所有用户动态
    async getMomentList(offest, size) {
        const statement = `SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, JSON_OBJECT('id', u.id, 'name', u.name) USER,
                            (SELECT COUNT(*) FROM COMMENT c WHERE c.moment_id = m.id) commentCount,
                            (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
                            FROM moment m LEFT JOIN USER u ON m.user_id = u.id LIMIT ?, ?;`;
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

    //判断是否已经有关联
    async hasLabel(momentId, labelId) {
        try {
            const statement = `select * from moment_label where moment_id = ? and label_id = ?`;
            const [res] = await connection.execute(statement, [momentId, labelId]);
            return res[0] ? true :false;
        } catch (e) {
            console.log(e);
        }
    }
    //向关系表增加关系
    async addLabel(momentId, labelId) {
        const statement = `insert into moment_label(moment_id, label_id) values(?, ?)`;
        const [res] = await connection.execute(statement, [momentId, labelId]);
        return res;
    }
}

module.exports = new momentService();