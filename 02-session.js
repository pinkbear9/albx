const express = require("express");
const session = require("express-session");
const app = express();
app.listen(9090, () => {
    console.log("http://127.0.0.1:9090");
});
// 注册session
app.use(session({
    secret: "随机字符串",// 加盐：加密
    resave: false,// 重新保存，强制会话保存即使是未修改的，默认为true但是得写上
    saveUninitialized: false// 强制“未初始化”的会话保存到存储
}));

app.get("/", (req, res) => {
    if (req.session.isLogin && req.session.isLogin == "true") {
        res.end("welcome back");
    } else {
        req.session.isLogin = "true";
        res.end("first");
    }
})