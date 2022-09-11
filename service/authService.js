const connection = require('../app/database');
class AuthService {
    async checkMoment(id, momentId) {
        try {
            const statement = `SELECT * FROM moment WHERE id = ? and user_id = ?;`;
            const [ res ] = await connection.execute(statement, [momentId, id]);
            return res.length === 0 ? false : true;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new AuthService();