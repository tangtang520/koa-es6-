var app = require('koa')()
  , koa = require('koa-router')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');
var wechat = require('co-wechat');
/**
 * Config
 */
const config = require("./config/config");

/**
 * Connect to database
 */

require("./lib/connect_db");
process.on('SIGINT',function(){
  var mongoose = require('mongoose');
  mongoose.connection.close(function(){
    console.log('mongoose close through app terminal');
    process.exit(0);
  });
});
/**
 * Load the models
 */
var fs = require("fs");
const modelsPath = config.app.root + "/models";
fs.readdirSync(modelsPath).forEach(function(file) {
  if(file != '.DS_Store'){
    fs.readdirSync(modelsPath + '/' + file).forEach(function(files){
      if (~files.indexOf("js")) {
        require(modelsPath + "/" + file + '/' + files);
      }
    })
  }
});
// global middlewares
var routes = require('./routes/routes');
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));
// routes definition
require('./routes/routes')(app);
// mount root routes  
app.use(koa.routes());
app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});
/**
 * 微信操作
 */
app.use(wechat('wechat').middleware(function *() {
  // 微信输入信息都在this.weixin上
  var message = this.weixin;
  if (message.FromUserName === 'diaosi') {
    // 回复屌丝(普通回复)
    this.body = 'hehe';
  } else if (message.FromUserName === 'text') {
    //你也可以这样回复text类型的信息
    this.body = {
      content: 'text object',
      type: 'text'
    };
  } else if (message.FromUserName === 'hehe') {
    // 回复一段音乐
    this.body = {
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3"
      }
    };
  } else if (message.FromUserName === 'kf') {
    // 转发到客服接口
    this.body = {
      type: "customerService",
      kfAccount: "test1@test"
    };
  } else {
    // 回复高富帅(图文回复)
    this.body = [
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ];
  }
}));
module.exports = app;
