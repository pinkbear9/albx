//  分类数据加载
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "baixiu",
    // 会将日期值以moment.js来处理
    dateStrings: true
})

module.exports = {
    // 分类数据加载
    getCateList(callback) {
        let sql = `select * from categories`;
        connection.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null, result)
            }
        })
    },
    // 编辑分类目录
    editCate(obj, callback) {
        let sql = 'update categories set ? where id=?';
        connection.query(sql,[obj,obj.id] ,(err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    // 添加分类目录
    addCate(obj, callback) {
        let sql = 'insert into categories set ?';
        connection.query(sql, [obj], (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    // 点击删除数据
    deleteCate(id, callback) {
        let sql = `delete from categories where id in (${id})`;
        connection.query(sql,(err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }
}