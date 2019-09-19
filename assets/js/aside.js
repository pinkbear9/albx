$(function () {
    let fullUrl = location.href; // 完整地址
    let str = fullUrl.indexOf("?"); // 查看地址中是否带有值
    let routerUrl = ""; // 定义一个我们所需要的路由变量
    // 得到我们想要的路由地址，进行判断
    if (str == -1) {// 说明不带有值
        routerUrl = fullUrl.substring(fullUrl.lastIndexOf("/") + 1);
    } else {
        routerUrl = fullUrl.substring(fullUrl.lastIndexOf("/") + 1, fullUrl.indexOf("?"));
    };
    // 判断文章
    let menuPosts = $("#menu-posts"); // 获取文章ul元素
    if (routerUrl == "posts" || routerUrl == "post-add" || routerUrl == "categories") {
        menuPosts.addClass("in");
        menuPosts.attr("aria-expanded", "true");
        menuPosts.siblings('a').removeClass('collapsed')
    }

    // 判断数据
    let menuSettings = $("#menu-settings"); // 获取文章ul元素
    if (routerUrl == "nav-menus" || routerUrl == "slides" || routerUrl == "settings") {
        menuSettings.addClass("in");
        menuSettings.attr("aria-expanded", "true");
        menuSettings.siblings('a').removeClass('collapsed')
    }
    // 给当前显示的页面，添加高亮显示
    $("#" + routerUrl).addClass("active");
})