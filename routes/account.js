/**
 * Created by tangtang on 16/2/1.
 */
'use strict'
const Router = require('koa-router');
const router = new Router();
const accountController = require('../controllers/account/account');

//注册接口
router.post('/register',accountController.register);

//密码修改 通过老密码
router.put('/pass',accountController.updatePass);

//发送验证码
router.post('/sendCode',accountController.sendCode);

//核对验证码
router.post('/checkCode',accountController.checkCode);

//修改密码 通过验证码
router.put('/codePass',accountController.checkCodeAndUpdatePass);

//登录接口
router.post('/login',accountController.login);

//获取用户详情
router.get('/:_id',accountController.getUserDetails);

//编辑用户
router.put('/',accountController.updateUser);

//学生选择学校
router.post('/selectSchool',accountController.selectSchool);

//获取所有学校
router.get('/allSchool',accountController.getAllSchool);

module.exports = router.routes();