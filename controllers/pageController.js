
module.exports = {
    // 加载前端页面
    getIndexPage(req, res) {
        res.render("index.ejs");
    },
    getDetailPage(req, res) {
        res.render("detail.ejs");
    },
    getListPage(req, res) {
        res.render("list.ejs");
    },

    // 加载后台页面
    getAdminIndexPage(req, res) {
        res.render("admin/index.ejs");
    },
    getAdminCategoriesPage(req, res) {
        res.render("admin/categories.ejs");
    },
    getAdminCommentsPage(req, res) {
        res.render("admin/comments.ejs");
    },
    getAdminLoginPage(req, res) {
        res.render("admin/login.ejs");
    },
    getAdminNavMenusPage(req, res) {
        res.render("admin/nav-menus.ejs");
    },
    getAdminPasswordResetPage(req, res) {
        res.render("admin/password-reset.ejs");
    },
    getAdminPostAddPage(req, res) {
        res.render("admin/post-add.ejs");
    },
    getAdminPostsPage(req, res) {
        res.render("admin/posts.ejs");
    },
    getAdminProfilePage(req, res) {
        res.render("admin/profile.ejs");
    },
    getAdminSettingsPage(req, res) {
        res.render("admin/settings.ejs");
    },
    getAdminSlidesPage(req, res) {
        res.render("admin/slides.ejs");
    },
    getAdminUsersPage(req, res) {
        res.render("admin/users.ejs");
    }
}