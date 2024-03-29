const userModel = require("../models/userModel");
module.exports = {
    // 登陆验证
    login(req, res) {
        // 1.接收用户参数
        var obj = req.body;
        // 2.调用数据模块,传入一个回调函数
        userModel.login(obj.email, (err, data) => {
            if (err) {
                // 正面这个代码做了两个事情:
                // 1.将对象转换为json格式字符串
                // 2.返回
                res.end(JSON.stringify({
                    code: 400,
                    msg: '服务器异常,请稍后重试'
                }))
            } else {
                // 判断有没有查询到数据
                if (data) {   // 说明查询到数据
                    // 再进行密码是否匹配的判断
                    if (data.password == obj.password) { // 说明密码匹配,登陆成功
                        // res.writeHear(200,{
                        //     "Set-Cookie":"isLogin=true"
                        // })
                        // res.end(JSON.stringify({
                        //     code: 200,
                        //     msg: '登陆成功'
                        // }))
                        // res.json({
                        //     code: 200,
                        //     msg: '登陆成功'
                        // })
                        // session
                        req.session.isLogin = "true";
                        req.session.currentUser = data;
                        res.json({
                            code: 200,
                            msg: '登陆成功'
                        })
                        // res.redirect("/login")
                    } else {
                        res.json({
                            code: 400,
                            msg: '密码输入错误'
                        })
                    }
                } else { // 说明根据email没有能够查询到相应的数据,说明email输入错误
                    res.json({
                        code: 400,
                        msg: '邮箱输入错误'
                    })
                }
            }
        })
    },
    // 退出登录
    loginOut(req, res) {
        req.session.isLogin = "";
        res.redirect('/login')
    }
}