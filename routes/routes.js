/**
 * Created by tangtang on 16/1/27.
 */
'use strict'
const Router  = require('koa-router');
const router = new Router();
const account = require('./account');
const testController = require('../controllers/test/test');
module.exports = function(app){
    //揭露相关接口
    router.use('/',function*(next){
        this.body = '恭喜您登陆成功';
        console.log('aa');
        yield next;
        console.log('bb');
    })
    router.use('/account',account);
    router.get('/test',testController.test);
    app.use(router.routes());
}
