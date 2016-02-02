/**
 * Created by tangtang on 16/2/1.
 */
'use strict'
var mongoose = require('mongoose');
var User = mongoose.model('User');
exports.register = function* (){
    console.log('登录相关接口');
    const json = {name:'汤丰源'};
    try{
        const result = yield User.create(json);
        this.body = result;
    }catch(err){
        console.log('err--->>',err);
    }
}