/*
* 数据库相关
* */

const mysql = require('mysql2');
// 创建连接池
const connection = mysql.createPool({
    host: 'localhost',
    database: 'coderhub2',
    user: 'root',
    password: 'root',
    connectionLimit: 10,

});

// 测试连接
connection.getConnection((err, conect) => {
    conect.connect((err) => {
        if (err) {
            console.log("数据库连接失败~", err);
        } else {
            console.log("数据库连接成功~");
        }
    });
})

module.exports = connection.promise();