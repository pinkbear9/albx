$(function () {
    $(".loginOut").on("click", function () {
        $.ajax({
            type: "get",
            url: "/loginOut",
            success: function () {
                console.log("loginOut");
                location.href = "/login"
            }
        })
    })
})