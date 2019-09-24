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
    // 获取所有文章数据
    // query是客户端传递的参数，它是一个对象
    // 现在包含两个数据：pageSize   pageNum
    // pageSize 每页显示的记录数  
    // pageNum  当前页码
    // cate  所有分类
    // statu 所有状态
    postsData(query, callback) {
        let sql = `select posts.*,users.nickname,categories.name 
                   from posts
                   join users on posts.user_id = users.id
                   join categories on posts.category_id = categories.id `;
        if (query.cate && query.cate != "all") {
            sql += ` and posts.category_id = ${query.cate}`;
        }
        if (query.statu && query.statu != "all") {
            sql += ` and posts.status = '${query.statu}'`;
        }
        sql += ` order by id DESC
                limit ${(query.pageNum - 1) * query.pageSize},${query.pageSize}`;
        connection.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                sql = `select count(*) as cnt from posts where 1=1`;
                if (query.cate && query.cate != "all") {
                    sql += ` and posts.category_id = ${query.cate}`;
                }
                if (query.statu && query.statu != "all") {
                    sql += ` and posts.status = '${query.statu}'`;
                }
                connection.query(sql, (err2, result2) => {
                    if (err2) {
                        callback(err2)
                    }
                    callback(null, {data:result,cnt:result2[0].cnt});
                })
            }
        })
    },
    // 处理新增数据
    addPost(obj, callback) {
        // console.log(obj)
        let sql = `insert into posts set ?`;
        connection.query(sql, obj, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null);
            }
        })
    },
    // 根据id获取文章详情数据
    getPostById(id, callback) {
        let sql = 'select * from posts where id = ' + id
        connection.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null, results[0])
            }
        })
    },
    // 实现文章的编辑
    editPost(obj, callback) {
        // sql：使用参数化查询
        // 它会自动的根据传入的数据对象的属性和对应的值生成sql语句
        let sql = 'update posts set ? where id = ?'
        connection.query(sql, [obj, obj.id], (err) => {
            if (err) {
                console.log(err)
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    // 删除数据
    deletePost(id, callback) {
        let sql = 'delete from posts where id=' + id;
        connection.query(sql, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }
}