$(function () {
    var pageSize = 2;   // 每页的记录数
    var pageNum = 1;    // 当前页码
    var total = 0;  // 总数据条数
    
    function init(obj) {
        $.ajax({
            type: "get",
            url: "/postsData",
            data: {
                pageSize,
                pageNum,
                ...obj
            },
            success: function (res) {
                var html = template("tp", res.data);
                $("#tbody").html(html);
                total = res.data.cnt;
                setPage(Math.ceil(total / pageSize))
            }
        });
    }

    init()

    function setPage(total) {
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: pageNum,
            // 总页数
            totalPages: total,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event, originalEvent, type, page) {
                // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                pageNum = page,
                    obj = {
                        cate: $(".catePostList").val(),
                        statu: $(".savePostList").val()
                    }
                init(obj);
            }
        })
    }

    // 分类数据加载
    $.ajax({
        type: "get",
        url: "/getCateList",
        dataType: "json",
        success: function (res) {
            let html = `<option value="all">所有分类</option>`;
            res.data.forEach(e => {
                html += `<option value="${e.id}">${e.name}</option>`
            })
            $(".catePostList").html(html);
        }
    })

    // 点击筛选按钮
    $(".btn").on("click", function () {
        // 获取筛选条件
        let obj = {
            cate: $(".catePostList").val(),
            statu: $(".savePostList").val()
        }
        pageNum = 1;
        // 发送ajax请求
        init(obj);
    })

    // 点击选择每页几条数据
    $(".userSize").on("change", function () {
        pageSize = $(this).val();
        init()
    })

    // 删除数据
    $("#tbody").on("click", ".delete", function () {
        if (confirm("你确定删除吗？")) {
            let id = $(this).data().id;
            $.ajax({
                type: "post",
                url: "/deletePost",
                data: { id },
                dataType: "json",
                success: function (res) {
                    if (res.code == 200) {
                        if (Math.ceil((total - 1) / pageSize) < pageNum) {
                            pageNum = (pageNum == 1) ? 1 : --pageNum;
                        }
                        init();
                        $(".alert-danger > span").text(res.msg);
                        $(".alert-danger").fadeIn(500).delay(2000).fadeOut(500);
                    }
                }
            })
        }
    })
})