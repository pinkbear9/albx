$(function () {
    function init() {
        $.ajax({
            type: "get",
            url: "/getNavMenus",
            dataType: "json",
            success: function (res) {
                $("tbody").html(template("tp",res))
            }
        })
    }
    init()

    // 点击添加按钮
    $(".btnAdd").on("click", function () {
        $.ajax({
            type: "post",
            url: "/addNavMenus",
            data: $("form").serialize(),
            dataType: "json",
            success: function (res) {
                if (res.code == 200) {
                    init()
                    $(".alert-danger > span").text(res.msg);
                    $(".alert-danger").fadeIn(500).delay(2000).fadeOut(500);

                    $("#text").val("");
                    $("#title").val("");
                    $("#link").val("");
                }
            }
        })
    })
})