"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    // 获取数据库数据
    let result = await this.app.mysql.get("blog_content", {});
    this.ctx.body = result;
  }
  async login() {
    
    const {userName, password} = this.ctx.request.body
    const sql = `SELECT userName FROM user WHERE userName = '${userName}' AND password = '${password}'`
    const res = await this.app.mysql.query(sql)
    if(res.length > 0) {
      // 登录成功，进行session缓存
      const loginId = userName + new Date().getTime()
      this.ctx.session,loginId = { loginId }
      this.ctx.body = {
        data: '登录成功',
        loginId
      }
    }else {
      this.ctx.body = {
        data: '登录失败'
      }
    }
  }

  async getArticles() {
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.addTime as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id";

    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results,
    };
  }

  async getDetailsById(content) {
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.params.id;

    // let sql = 'SELECT article.id as id,'+
    // 'article.title as title,'+
    // 'article.content as content,'+
    // "article.addTime as addTime,"+
    // 'article.view_count as view_count ,'+
    // 'type.typeName as typeName ,'+
    // 'type.id as typeId '+
    // 'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    // 'WHERE article.id='+id
    let sql =
      "SELECT * " + "FROM article LEFT JOIN type ON article.type_id = type.Id WHERE article.id = " + id;

    const result = await this.app.mysql.query(sql);

    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
