const express = require("express");
// const fs = require("fs");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = require("./router");
const app = express();
app.listen(8899, () => {
    console.log("http://127.0.0.1:8899");
});

app.use("/assets", express.static("assets"));
app.use("/uploads", express.static("uploads"));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 注册session
app.use(session({
    secret: "随机字符串",// 加盐：加密
    resave: false,// 重新保存，强制会话保存即使是未修改的，默认为true但是得写上
    saveUninitialized: false// 强制“未初始化”的会话保存到存储
}));

// 注册路由中间件
app.use(function (req, res, next) {
    if (req.session.isLogin && req.session.isLogin == 'true' || req.url == '/login' || req.url.indexOf('/admin') == -1) {
        next()
    } else {
        res.redirect('/login')
    }
});

app.use(router);
