/**
 * Created by tangtang on 16/5/11.
 */
'use strict'
const mongoose = require('mongoose');
const User = mongoose.model('User');
const CommonDao = require('../../utils/tools');
const clientDao = require('../redis/redis');

let resMsg = {
    "successMsg":{
        res:'SUCCESS',
        data:null
    },
    "failedMsg":{
        res:'FAILED',
        msg:'系统出错'
    }
};

//注册接口
exports.register = function* (){
    try{
        const data = this.request.body;
        console.log('data---->>',data);
        if(data.userType === 'SCHOOL'){
            resMsg.failedMsg.msg = '不能添加系统管理员';
            this.body = resMsg.failedMsg;
            return;
        };
        if(!data.userType || !data.userName || !data.password || !data.realName || !data.mail){
            resMsg.failedMsg.msg = '缺少对应的参数';
            this.body = resMsg.failedMsg;
            return;
        };

        //检验邮箱格式
        if(!CommonDao.isEmail(data.mail)){
            resMsg.failedMsg.msg = '邮箱格式不正确';
            this.body = resMsg.failedMsg;
            return;
        };
        //判断用户名是否存在 在整个数据结构中要唯一性 邮箱的唯一性
        const isUserNameAndMail = yield Promise.all([User.count({userName:data.userName,isDelete:false}).exec(),
        User.count({mail:data.mail,isDelete:false}).exec()]);
        if(isUserNameAndMail[0] > 0 && isUserNameAndMail[1] > 0){
            resMsg.failedMsg.msg = '用户名与邮箱已存在';
            this.body = resMsg.failedMsg;
            return;
        };
        if(isUserNameAndMail[0] > 0){
            resMsg.failedMsg.msg = '用户名已存在';
            this.body = resMsg.failedMsg;
            return;
        };
        if(isUserNameAndMail[1] > 0){
            resMsg.failedMsg.msg = '邮箱已存在';
            this.body = resMsg.failedMsg;
            return;
        };
        data.password = CommonDao.createMD5(data.password);
        const result = yield User.create(data);
        resMsg.successMsg.data = result;
        this.body = resMsg.successMsg;
    }catch(err){
        console.log('err---',err);
        this.body = resMsg.failedMsg;
    }
};

//修改密码 oldPassword newPassword userName
exports.updatePass = function* (){
    try{
        const data = this.request.body;
        console.log('data---->>',data);
        if(!data.oldPassword || !data.newPassword || !data.userName){
            resMsg.failedMsg.msg = '参数上传不正确';
            this.body = resMsg.failedMsg;
            return;
        };
        //判断密码是否正确
        const result = yield User.findOneAndUpdate({userName:data.userName,
            password:CommonDao.createMD5(data.oldPassword),isDelete:false},
            {$set:{password:CommonDao.createMD5(data.newPassword)}}).exec();
        if(!result){
            resMsg.failedMsg.msg = '用户已被删除,或者密码不正确';
            this.body = resMsg.failedMsg;
            return;
        };
        resMsg.successMsg.data = result;
        this.body = resMsg.successMsg;
    }catch(err){
        console.log('err--->>',err);
        this.body = resMsg.failedMsg;
    }
};

//发送验证码 mail  忘记密码操作
exports.sendCode = function* (){
    try{
        const data = this.request.body;
        console.log('data--->>',data);
        if(!data.mail){
            resMsg.failedMsg.msg = '参数上传不正确';
            this.body = resMsg.failedMsg;
            return;
        };
        if(!CommonDao.isEmail(data.mail)){
            resMsg.failedMsg.msg = '邮箱格式不正确';
            this.body = resMsg.failedMsg;
            return;
        };
        const isUser = yield User.count({mail:data.mail,isDelete:false,userType:{$ne:'SCHOOL'}}).exec();
        if(isUser === 0){
            resMsg.failedMsg.msg = '邮箱不存在';
            this.body = resMsg.failedMsg;
        };
        //发送邮箱验证码
        const code = CommonDao.createCode(6);
        const msg = '您的验证码为' + code + ',验证码三分钟有效,请您尽快验证';
        const result = yield CommonDao.sendCode(data.mail,msg);
        console.log('result--->>',result);
        this.body = resMsg.successMsg;
        //设置redis
        clientDao.setex(data.mail,global.codeTTL,code);
    }catch(err){
        console.log('err---->>',err);
        this.body = resMsg.failedMsg;
    }
};

//核对验证码 mail code
exports.checkCode = function* (){
    try{
        const data = this.request.body;
        if(!data.mail || !data.code){
            resMsg.failedMsg.msg = '参数上传不正确';
            this.body = resMsg.failedMsg;
            return;
        };
        const result = yield clientDao.get(data.mail);
        if(!result){
            resMsg.failedMsg.msg = '验证码已失效';
            this.body = resMsg.failedMsg;
            return;
        };
        if(data.code !== result){
            resMsg.failedMsg.msg = '验证码不正确';
            this.body = resMsg.failedMsg;
            return;
        };
        this.body = resMsg.successMsg;
        //删除redis
        clientDao.del(data.mail);
    }catch(err){
        console.log('err--->>',err);
        this.body = resMsg.failedMsg;
    }
};

//修改密码 mail newPassword
exports.checkCodeAndUpdatePass = function* (){
    try{
        const data = this.request.body;
        if(!data.mail || !data.newPassword){
            resMsg.failedMsg.msg = '参数上传不正确';
            this.body = resMsg.failedMsg;
            return;
        };
        const result = yield User.findOneAndUpdate({mail:data.mail,isDelete:false},
            {$set:{password:CommonDao.createMD5(data.newPassword)}}).exec();
        if(!result){
            resMsg.failedMsg.msg = '邮箱地址不正确';
            this.body = resMsg.failedMsg;
            return;
        };
        resMsg.successMsg.data = result;
        this.body = resMsg.successMsg;
    }catch(err){
        console.log('err--->>',err);
        this.body = resMsg.failedMsg;
    }
}