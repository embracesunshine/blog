"use strict";

const Controller = require('egg').Controller

class adminController extends Controller {

    async index() {
        // 首页的文章数据
        this.ctx.body = 'hi api'
    }
    async checkLogin() {
        // 前台表单提交登录信息
        const userName = this.ctx.request.body.userName
        const password = this.ctx.request.body.password
        // 
        // const sql = "SELECT userName FROM admin_user WHERE userName = '"+userName +
        //           "' AND password = '"+password+"'"
        const sql = `SELECT userName FROM admin_user WHERE userName = '${userName}' AND password = '${password}'`
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            // 登录成功， 进行session缓存   
            const loginSessionId = userName + new Date().getTime()
            this.ctx.session.loginSessionId = { loginSessionId }
            this.ctx.body = {
                data: '登录成功',
                loginSessionId
            }
        } else {
            this.ctx.body = {
                data: '登录失败'
            }
        }
    }
    // 获取文章类别信息
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = {
            data: resType
        }
    }
    // 增添文章
    async addArticle() {
        let tempArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article', tempArticle)
        const isInsertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body = {
            isInsertSuccess,
            insertId
        }
    }
    // 更新文章
    async updateArticle() {
        let tempArticle = this.ctx.request.body
        // console.log(tempArticle)
        const result = await this.app.mysql.update('article', tempArticle)
        const isUpdateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isUpdateSuccess
        }
    }
    // 获取文章列表
    async getArticleList() {
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "article.addTime as addTime," +
            "article.view_count as view_count," + 
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.id ' +
            'ORDER BY article.id DESC '
        const resultList = await this.app.mysql.query(sql)
        this.ctx.body = {
            list: resultList
        }
    }
    // 删除文章
    async deleteArticle() {
        let id = this.ctx.params.id;
        const result = await this.app.mysql.delete('article', {'id': id})
        this.ctx.body = {
            data: result
        }
    }
    // 根据文章id获取文章
    async getArticleById() {
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.content as content,'+
        "article.addTime as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body = {
            data: result
        }
    }
}

module.exports = adminController