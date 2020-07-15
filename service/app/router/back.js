
// 后台路由配置

module.exports = app => {
    const { router, controller } = app;
    const adminauth = app.middleware.adminauth();

    router.get('/admin/index', controller.back.index.index);
    router.post('/admin/checkLogin', controller.back.index.checkLogin);
    router.get('/admin/getTypeInfo',adminauth,controller.back.index.getTypeInfo);
    router.post('/admin/addArticle',adminauth,controller.back.index.addArticle);
    router.post('/admin/updateArticle',adminauth,controller.back.index.updateArticle);
    router.get('/admin/getArticleList',adminauth,controller.back.index.getArticleList);
    router.get('/admin/deleteArticle/:id',adminauth,controller.back.index.deleteArticle);
    router.get('/admin/getArticleById/:id',adminauth,controller.back.index.getArticleById);
}