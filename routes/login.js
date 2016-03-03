/**
 * Created by tangtang on 16/2/1.
 */
var Router = require('koa-router');
var router = new Router();
var loginController = require('../controllers/login/login');
//注册接口
router.get('/',loginController.register);
module.exports = router.routes();