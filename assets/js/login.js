$(function () {
    $(".btnlogin").on("click", function () {
        var emailValue = $("#email").val();
        var passwordValue = $("#password").val();
        $.ajax({
            type: "post",
            url: "/login",
            data: $('form').serialize(),
            dataType: "json",
            success: function () {
                location.href = "/admin";
            }
        })
    })
})