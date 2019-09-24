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
    // 导航菜单列表加载
    getNavMenus(callbalck) {
        let sql = 'select value from `options` where id=9';
        connection.query(sql, (err, result) => {
            if (err) {
                callbalck(err);
            } else {
                callbalck(null, result[0].value)
            }
        })
    },
    // 添加导航菜单
    addNavMenus(obj, callbalck) {
        // 先查找出原本的数据
        let sql = 'select value from `options` where id=9';
        connection.query(sql, (err, result) => {
            if (err) {
                callbalck(err);
            } else {
                // 把查找出的数据变成对象或者数组
                let data = JSON.parse(result[0].value);
                data.push(obj);
                // 将数据转换成json格式
                let jsonStr = JSON.stringify(data);
                sql = 'update `options` set value = ? where id=9';
                connection.query(sql, [jsonStr], err1 => {
                    if (err1) {
                        callbalck(err1);
                    } else {
                        callbalck(null)
                    }
                })
            }
        })
    }
}