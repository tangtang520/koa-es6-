/**
 * Created by tangtang on 16/3/3.
 */
var wechat = require('co-wechat');
module.exports = function(app){
    app.use(wechat('wechat').middleware(function* (){
        var message = this.weixin;
        console.log('message-->>',message);
        if(message.MsgType === 'text'){
            this.body = "我爱你 老婆";
        }
    }))
}