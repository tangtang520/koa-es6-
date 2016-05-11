/**
 * Created by tangtang on 16/2/1.
 */
'use strict'
const Router = require('koa-router');
const router = new Router();
const loginController = require('../controllers/account/login');
const registerController = require('../controllers/account/register');

//登录接口
router.post('/login',loginController.login);

//注册接口
router.post('/register',registerController.register);

//密码修改 通过老密码
router.put('/pass',registerController.updatePass);

//发送验证码
router.post('/sendCode',registerController.sendCode);

//核对验证码
router.post('/checkCode',registerController.checkCode);

//修改密码 通过验证码
router.put('/codePass',registerController.checkCodeAndUpdatePass);


module.exports = router.routes();