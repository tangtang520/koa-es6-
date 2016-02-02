/**
 * Created by tangtang on 16/2/1.
 */
var mongoose = require("mongoose");
var config = require("../config/config");
var DBConfig = config.mongo;
var options = DBConfig.option;
var conStr = DBConfig.url;
//连接复制集
mongoose.connect(conStr,options);

//log message to console
mongoose.connection.on('connected',function(){
    console.log('mongoose connected to ' + conStr);
});

mongoose.connection.on('error',function(err){
    console.log('mongoose connected err: ' + err);
});

mongoose.connection.on('disconnected',function(){
    console.log('mongoose disconnected to ' + conStr);
});