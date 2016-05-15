/**
 * Created by tangtang on 16/5/10.
 */
'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const UserSchema = new schema({
    userName : String,  //用户名
    realName : String,  //真实名称
    password : String,  //md5加密
    cellPhone : String,  //手机号
    qq : String,  //QQ号
    wechat : String, //微信号
    mail : String,  //需要检验格式
    rank : String, //系别
    major : String, //专业
    studentID : String, //学号
    sex : String, //性别 MAN WOMAN
    schoolInfo:{schoolId:String,schoolName:String},
    userType :String,   //学生,公司,学校管理员  STUDENT  COMPANY SCHOOL
    createTime : {type : Date,default : Date.now()}, //创建时间
    updateTime : {type : Date,default : Date.now()}, //更新时间
    isDelete : {type : Boolean,default : false}
});
mongoose.model('User',UserSchema);