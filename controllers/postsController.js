const postsModel = require("../models/postsModel");
const moment = require("moment");
module.exports = {
    // 处理所有文章页面
    postsData(req, res) {
        let query = req.query;
        postsModel.postsData(query,(err, data) => {
            if (err) {
                res.send({
                    code: 400,
                    msg: "数据查询失败",
                })
            } else {
                // 遍历data，将其中的每一个元素对象的created数据格式改成你想要的
                // moment(您想转换的源格式).format(目标格式)
                // data.forEach(e => {
                //     e.created = moment(e.created).format("YYYY-MM-DD HH-mm-ss");
                // });
                res.send({
                    code: 200,
                    msg: "成功",
                    data
                })
            }
        })
    },
    // 新增文件数据
    addPost(req, res) {
        let obj = req.body;
        obj.id = null;
        obj.views = 0;
        obj.likes = 0;
        obj.user_id = req.session.currentUser.id;
        postsModel.addPost(obj, (err) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: "新增失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "新增成功"
                })
            }
        })
    },
    // 根据id获取文章详情
    getPostById(req, res) {
        // 接收参数
        let id = req.query.id
        // 调用数据模块获取数据
        postsModel.getPostById(id, (err, data) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: '数据查询失败'
                })
            } else {
                // 为了配合浏览器端的日期显示，这里需要将日期格式转换为：yyyy-MM-ddThh:mm
                data.created = moment(data.created).format('YYYY-MM-DDTHH:mm')
                res.json({
                    code: 200,
                    msg: '数据查询成功',
                    data
                })
            }
        })
    },
    // 实现文章的编辑
    editPost(req, res) {
        // 接收参数
        let obj = req.body;
        postsModel.editPost(obj, (err) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: '编辑失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '编辑成功'
                })
            }
        })
    },
    // 删除数据
    deletePost(req, res) {
        let id = req.body.id;
        postsModel.deletePost(id, (err) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: '删除失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '删除成功'
                })
            }
        })
    }
}