const optionsModel = require("../models/optionsModel");
module.exports = {
    // 导航菜单列表加载
    getNavMenus(req, res){
        optionsModel.getNavMenus((err, result) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: "加载失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "加载成功",
                    data: JSON.parse(result)
                })
            }
        })
    },
    // 添加导航菜单
    addNavMenus(req, res) {
        let obj = req.body;
        obj.icon = "fa fa-glass";
        optionsModel.addNavMenus(obj, (err,result) => {
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
    }
}