$(function () {
    $.ajax({
        type: "get",
        url: "/postsData",
        success: function (res) {
            var html = template("tp", { data: res.data });
            $("#tbody").html(html);
        }
    })
})