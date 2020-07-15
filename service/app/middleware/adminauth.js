
// 路由守卫

module.exports = options =>{
    return async function adminauth(ctx,next){
        // 注意此处写的是服务器的session的loginSessionId，不是浏览器的local Storage的  第一次登录就设置了，之后可以直接登录
        // 要想看到路由守卫中间件 将路由从localhost/index 跳转到登录页面效果，除非修改session
        if(ctx.session.loginSessionId){
            await next()
        }else{
            ctx.body={data:'未登录'}
        }
    }
}