const express = require("express");
const pageController = require("./controllers/pageController");
const userController = require("./controllers/userController");
const router = express.Router();
// 加载前端页面
router.get("/", pageController.getIndexPage)
      .get("/detail", pageController.getDetailPage)
      .get("/list", pageController.getListPage)
      


      // 加载后台页面
      // 处理登录页面
      .post("/login", userController.login)
      .get("/admin", pageController.getAdminIndexPage)
      .get("/admin/categories", pageController.getAdminCategoriesPage)
      .get("/admin/comments", pageController.getAdminCommentsPage)
      .get("/login", pageController.getAdminLoginPage)
      .get("/admin/nav-menus", pageController.getAdminNavMenusPage)
      .get("/admin/password-reset", pageController.getAdminPasswordResetPage)
      .get("/admin/post-add", pageController.getAdminPostAddPage)
      .get("/admin/posts", pageController.getAdminPostsPage)
      .get("/admin/profile", pageController.getAdminProfilePage)
      .get("/admin/settings", pageController.getAdminSettingsPage)
      .get("/admin/slides", pageController.getAdminSlidesPage)
      .get("/admin/users", pageController.getAdminUsersPage);

module.exports = router;