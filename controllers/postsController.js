const postsModel = require("../models/postsModel");
module.exports = {
    // 处理所有文章页面
    postsData(req, res) {
        postsModel.postsData((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send({
                    code: 200,
                    msg: "成功",
                    data: result
                })
            }
        })
    }
}