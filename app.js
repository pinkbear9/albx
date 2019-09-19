const express = require("express");
const fs = require("fs");
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

app.use(router);
