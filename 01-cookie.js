const express = require("express");
const app = express();
const queryString = require("querystring");
app.listen(9191, () => {
    console.log("http://127.0.0.1:9191");
});

app.get("/", (req, res) => {
    var obj = queryString.parse(req.headers.cookie);
    console.log(obj);
    if (obj.isLogin && obj.isLogin == "true") {
        res.end("welcome back");
    } else {
        res.writeHead(200, {
            "Set-Cookie": "isLogin=true"
        })
        res.end("first");
    }
})