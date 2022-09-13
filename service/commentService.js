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
}

module.exports = new CommentService();