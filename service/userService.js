const connection = require('../app/database');

class UserService {
    // 增加用户
    async create(user) {
        const {name, password} = user;
        const statement = `INSERT INTO user(name, password) VALUES(?, ?);`;
        const result = await connection.execute(statement, [name, password]);
        // 将user存储到数据库
        return result[0];
    };
    // 通过用户名拿用户
    async getUserByName(name) {
        const statement = `select * from user where name = ?;`;
        const res = await connection.execute(statement, [name]);
        return res[0];
    };
}

module.exports = new UserService();