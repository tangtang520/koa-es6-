/**
 * Created by tangtang on 16/5/11.
 */
'use strict'
const crypto = require('crypto');
const nodemailer = require('nodemailer');
let extra = {};
module.exports = extra;

//md5加密
extra.createMD5 = function(data){
    const md5 = crypto.createHash('md5');
    md5.update(data);
    return md5.digest('hex');
};

//判断邮箱格式是否正确
extra.isEmail = function(data){
    let reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    return reg.test(data);
};

//随机生成6位验证码
extra.createCode = function(num){
    let str = '';
    for(let i=0;i<num;i++){
        str += Math.floor(Math.random() * 10)
    };
    return str;
};

//给指定邮箱发送验证码
extra.sendCode = function(toMail,msg){
    return new Promise(function(resolve,reject){
        const config = {
            host: 'smtp.qq.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: '1315803594@qq.com',
                pass: 'yxjwebxuofdtjebd'
            }};
        var mailOptions = {
            from: '1315803594@qq.com', // sender address
            to: toMail, // list of receivers
            subject: '验证码', // Subject line
            text: msg, // plaintext body
            //html: '<b>Hello world 🐴</b>' // html body
        };
        const transporter = nodemailer.createTransport(config);
        transporter.sendMail(mailOptions, function(err, result){
            if(err){
                reject(new Error('发送验证码出错err',err));
            }else{
                resolve(result);
            }
        });
    })
}