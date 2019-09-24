const express = require("express");
const pageController = require("./controllers/pageController");
const userController = require("./controllers/userController");
const postsController = require("./controllers/postsController");
const cateController = require("./controllers/cateController");
const uploadController = require("./controllers/uploadController");
const optionsController = require("./controllers/optionsController");
const router = express.Router();
// 加载前端页面
router.get("/", pageController.getIndexPage)
      .get("/detail", pageController.getDetailPage)
      .get("/list", pageController.getListPage)
      


      // 加载后台页面
      .get("/login", pageController.getAdminLoginPage)
      // 处理登录页面
      .post("/login", userController.login)
      .get("/admin", pageController.getAdminIndexPage)
      .get("/admin/categories", pageController.getAdminCategoriesPage)
      .get("/admin/comments", pageController.getAdminCommentsPage)
      .get("/admin/nav-menus", pageController.getAdminNavMenusPage)
      .get("/admin/password-reset", pageController.getAdminPasswordResetPage)
      .get("/admin/post-add", pageController.getAdminPostAddPage)
      .get("/admin/posts", pageController.getAdminPostsPage)
      .get("/admin/profile", pageController.getAdminProfilePage)
      .get("/admin/settings", pageController.getAdminSettingsPage)
      .get("/admin/slides", pageController.getAdminSlidesPage)
      .get("/admin/users", pageController.getAdminUsersPage)
      .get("/loginOut", userController.loginOut)
      .get("/postsData", postsController.postsData)//所有文章页面加载

      // 加载分类数据
      .get("/getCateList", cateController.getCateList)
      // 新增文件数据
      .post("/addPost", postsController.addPost)
      // 获取id
      .get('/getPostById', postsController.getPostById)
      // 编辑数据
      .post("/editPost", postsController.editPost)
      // 删除数据
      .post("/deletePost", postsController.deletePost)


      // 文件上传
      .post("/uploadFile", uploadController.uploadFile)

      // 编辑分类目录
      .post('/editCate', cateController.editCate)
      // 添加分类目录
      .post('/addCate', cateController.addCate)
      // 删除分类目录
      .get('/deleteCate', cateController.deleteCate)

      // 设置
      // 导航菜单列表加载
      .get("/getNavMenus", optionsController.getNavMenus)
      // 导航菜单添加数据
      .post("/addNavMenus", optionsController.addNavMenus)

module.exports = router;