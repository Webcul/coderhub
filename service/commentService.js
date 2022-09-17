const connection = require('../app/database');

class CommentService {
    async create(momentId, content, userId) {
        try {
            const statement =  `INSERT INTO COMMENT(content, moment_id, user_id) VALUES(?,?,?);`;
            const [ res ] = await connection.execute(statement, [content, momentId, userId]);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    // 回复贴子
    async reply(content, momentId, userId, commentId) {
        try {
            const statement =  `INSERT INTO COMMENT(content, moment_id, user_id, comment_id) VALUES(?,?,?,?);`;
            const [ res ] = await connection.execute(statement, [content, momentId, userId, commentId]);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    // 修改贴子
    async update(commentId, content) {
        try {
            const statement = `UPDATE comment SET content = '${content}' WHERE id = ${commentId};`;
            const [res] = await connection.execute(statement);
            // console.log(res);
            return res;
        } catch (e) {
            console.log(e)
        }
    }
    // 删除贴子
    async remove(commentId) {
        try {
            const statement = `delete from comment where id = ?`;
            const [res] = await connection.execute(statement, [ commentId ]);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new CommentService();