// 处理文件上传
const formidable = require("formidable");
module.exports = {
    uploadFile(req, res) {
        // 创建文件上传对象
        let form = new formidable.IncomingForm();
        // 配置编码格式
        form.encoding = "utf-8";
        // 设置文件上传之后的文件路径
        form.uploadDir = "./uploads";
        // 是否保留扩展名
        form.keepExtensions = true;
        // 实现
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.json({
                    code: 400,
                    msg: "文件上传失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "文件上传成功",
                    img: files.img.path
                })
            }
        })
    }
}