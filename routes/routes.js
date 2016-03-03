/**
 * Created by tangtang on 16/1/27.
 */
var Router  = require('koa-router');
var router = new Router();
var login = require('./login');
module.exports = function(app){
    router.use('/login',login);
    app.use(router.routes());
}
