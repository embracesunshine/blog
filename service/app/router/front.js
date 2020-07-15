/*
    前台路由配置
*/
module.exports = app => {
    const {
        router,
        controller
    } = app;
    router.post('/login', controller.front.index.login)
    router.get('/', controller.front.index.index);
    router.get('/article', controller.front.index.getArticles);
    router.get('/details/:id', controller.front.index.getDetailsById);
}