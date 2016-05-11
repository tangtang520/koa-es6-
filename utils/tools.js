/**
 * Created by tangtang on 16/5/11.
 */
'use strict'
const crypto = require('crypto');
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
}