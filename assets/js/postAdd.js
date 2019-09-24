// 前台处理文件上传
$(function () {
    $("#feature").on("change", function () {
        let myfile = $("#feature")[0].files[0];
        let formData = new FormData();
        formData.append("img", myfile);
        formData.append("username", "jack_37");

        $.ajax({
            type: "post",
            url: "/uploadFile",
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.code == 200) {
                    $(".thumbnail").attr("src", "/" + res.img).show();
                    $('[name="feature"]').val(res.img.substring(res.img.lastIndexOf('\\') + 1))
                }
            }
        })
    })

    // 加载所属分类
    $.ajax({
        type: "get",
        url: "/getCateList",
        dataType: "json",
        success: function (res) {
            let html = '';
            res.data.forEach(e => {
                html += `<option value="${e.id}">${e.name}</option>`;
            })
            $("#category").html(html);
        }
    })

    // 初始化富文本框  覆盖文本域
    CKEDITOR.replace('content');

    // 获取可能存在的id
    let poatsId = itcast.getParams(location.search);
    $(".btnSave").on("click", function () {
        // 富文本框的数据获取  数据同步
        CKEDITOR.instances.content.updateElement();
        if (poatsId.id) {
           opt("/editPost")
        } else {
            opt("/addPost")
        }
     })
    

    function opt(url) {
        $.ajax({
            type: "post",
            url,
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    $(".alert-danger >span").text(res.msg);
                    $(".alert-danger").show();
                    setTimeout(() => {
                        location.href = "/admin/posts";
                    }, 2000);
                }
            }
        })
    }
    // 判断当前是否是编辑状态
    if (poatsId.id) { // 说明是编辑
        // 发起ajax请求
        $.ajax({
            type: 'get',
            url: '/getPostById',
            data: { id: poatsId.id },
            dataType: 'json',
            success: function (res) {
                $('#title').val(res.data.title)
                $('#content').val(res.data.content)
                $('#slug').val(res.data.slug)
                $('#category_id').val(res.data.category_id)
                $('#status').val(res.data.status)
                // 图片预览
                $('.thumbnail').attr('src', '/uploads/' + res.data.feature).show()
                // 存储隐藏域
                $('[name="feature"]').val(res.data.feature)
                // 时间:将之前的日期转换为指定的yyyy-MM-ddThh:mm格式
                $('#created').val(res.data.created)
                $('[name="id"]').val(res.data.id)

            }
        })
    }
})