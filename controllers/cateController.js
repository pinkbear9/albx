// 分类数据加载
const cateModel = require("../models/cateModel");
module.exports = {
    // 分类数据加载
    getCateList(req, res) {
        cateModel.getCateList((err, data) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: "加载失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "加载成功",
                    data
                })
            }
        })
    },
    // 编辑分类目录
    editCate(req, res) {
        var obj = req.body;
        cateModel.editCate(obj, (err) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: "编辑失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "编辑成功"
                })
            }
        })
    },
    // 添加分类目录
    addCate(req, res) {
        var obj = req.body;
        obj.id = null;
        cateModel.addCate(obj, (err) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: "添加失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "添加成功"
                })
            }
        })
    },
    // 点击删除分类列表的数据
    deleteCate(req, res) {
        let id = req.query.id;
        cateModel.deleteCate(id, (err) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: "删除失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "删除成功"
                })
            }
        })
    }
}