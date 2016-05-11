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
    router.use('/account',account);
    router.get('/test',testController.test);
    app.use(router.routes());
}
