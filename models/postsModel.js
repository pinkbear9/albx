const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "baixiu"
})
module.exports = {
    postsData(callback) {
        let sql = `select posts.*,users.nickname,categories.name from posts,users,categories where posts.user_id = users.id and posts.category_id = categories.id`;
        connection.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null, result);
            }
        })
    }
}