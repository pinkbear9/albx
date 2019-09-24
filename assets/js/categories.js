$(function () {
    function init() {
        $.ajax({
            type: "get",
            url: "/getCateList",
            dataType: "json",
            success: function (res) {
                $("tbody").html(template("ty", res))
            }
        })
    }
    init();

    // 点击分类目录列表的编辑按钮
    $("tbody").on("click", ".btnEdit", function () {
        $("#name").val($(this).data().name);
        $("#slug").val($(this).data().slug);
        $("[name='id']").val($(this).data().id);

        $(".btnAdd").hide();
        $(".btnEditById").show();
    })

    // 点击编辑按钮
    $(".btnEditById").on("click", function () {
        $.ajax({
            type: "post",
            url: "/editCate",
            data: $("form").serialize(),
            dataType: "json",
            success: function (res) {
                if (res.code == 200) {
                    init();
                    $("#name").val("");
                    $("#slug").val("");
                    $("[name='id']").val("");

                    $(".btnAdd").show();
                    $(".btnEditById").hide();

                    $(".alert-danger > span").text(res.msg);
                    $(".alert-danger").fadeIn(500).delay(2000).fadeOut(500);
                }
            }
        })
    })

    // 点击添加按钮
    $(".btnAdd").on("click", function () {
        $.ajax({
            type: "post",
            url: "/addCate",
            data: $("form").serialize(),
            dataType: "json",
            success: function (res) {
                if (res.code == 200) {
                    init();
                    $("#name").val("");
                    $("#slug").val("");
                    $("[name='id']").val("");

                    $(".btnAdd").show();
                    $(".btnEditById").hide();

                    $(".alert-danger > span").text(res.msg);
                    $(".alert-danger").fadeIn(500).delay(2000).fadeOut(500);
                }
            }
        })
    })

    // 点击分类目录列表的删除按钮
    $("tbody").on("click", ".btnDelete", function () {
        if (confirm("你确定删除吗？")) {
            let id = $(this).data().id;
            $.ajax({
                type: "get",
                url: "/deleteCate",
                data: { id },
                dataType: "json",
                success: function (res) {
                    if (res.code == 200) {
                        init();
                        $(".alert-danger > span").text(res.msg);
                        $(".alert-danger").fadeIn(500).delay(2000).fadeOut(500);
                    }
                }
            })
        }
    })

    // 全选全不选
    $(".chkAll").on("click", function () {
        let statu = $(this).prop("checked");
        $("tbody .chk").prop("checked", statu);
        if ($("tbody .chk:checked").length > 1) {
            $(".btnDeletes").show();
        } else {
            $(".btnDeletes").hide();
        }
        
    })

    //  选中下面的改变全选全不选
    $("tbody").on("click", ".chk", function () {
        // if ($("tbody .chk:checked").length == $("tbody .chk").length) {
        //     $(".chkAll").prop("checked", true);
        //     $(".btnDeletes").show();
        // } else {
        //     $(".chkAll").prop("checked", false);
        //     if ($("tbody .chk:checked").length < 2) {
        //         $(".btnDeletes").hide();
        //     } else {
        //         $(".btnDeletes").show();
        //     }
        // }
        if ($("tbody .chk:checked").length > 1) { 
            $(".btnDeletes").show();
        } else {
            $(".btnDeletes").hide();
        }

        if ($("tbody .chk:checked").length == $("tbody .chk").length) {
            $(".chkAll").prop("checked", true);
        } else { 
            $(".chkAll").prop("checked", false);
        }
    })

    // 点击批量删除按钮
    $(".btnDeletes").on("click", function () {
        let all = $("tbody .chk:checked");
        let arr = [];
        for (var i = 0; i < all.length; i++){
            arr.push(all[i].dataset["id"])
        }  
        if (confirm("你确定删除吗？")) {
            $.ajax({
                type: "get",
                url: "/deleteCate",
                data: { id: arr.join(",") },
                dataType: "json",
                success: function (res) {
                    if (res.code == 200) {
                        init();
                        $(".alert-danger > span").text(res.msg);
                        $(".alert-danger").fadeIn(500).delay(2000).fadeOut(500);
                    }
                }
            })
        }
    })

})