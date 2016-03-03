var app = require('koa')()
  , koa = require('koa-router')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');

var WechatAPI = require('co-wechat-api');
var wechat = require('co-wechat');
var api = new WechatAPI('wx2a3767e2a57da7cb', '1ebe1425ffd78fa360b1d26314670d34');
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

/**
 * 微信服务器验证地址
 */
app.use(wechat('wechat').middleware(function* (){
  console.log('----------------------');
  var message = this.weixin;
  console.log('message-->>',message);
}))
app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

module.exports = app;
