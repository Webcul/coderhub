const connection = require('../app/database');
class AuthService {
    async checkResource(tableName, userId, id) {
        try {
            const statement = `SELECT * FROM ${tableName} WHERE id = ? and user_id = ?;`;
            const [ res ] = await connection.execute(statement, [id, userId]);
            return res.length === 0 ? false : true;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new AuthService();