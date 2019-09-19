const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "baixiu"
})
module.exports = {
    // 处理登录
    login(email, callback) {
        let sql = `select * from users where email='${email}'`;
        connection.query(sql, (err, result) => {
            err && console.log(err);
            callback(null,result[0]);

            // if (err) {
            //     callback(err)
            // } else {
            //     // results是一个数组
            //     // 当前查询要么没有数据,要么就只有一条数据
            //     callback(null, results[0])
            // }
        })
    }
}