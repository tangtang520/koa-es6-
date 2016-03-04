/**
 * Created by tangtang on 16/3/3.
 */
'use strict'
var WechatAPI = require('co-wechat-api');
var wechat = require('co-wechat');
var api = new WechatAPI('wx2a3767e2a57da7cb', '1ebe1425ffd78fa360b1d26314670d34');
var menu = {
    "button":[
        {
            "type":"click",
            "name":"今日歌曲",
            "key":"V1001_TODAY_MUSIC"
        },
        {
            "name":"菜单",
            "sub_button":[
                {
                    "type":"view",
                    "name":"搜索",
                    "url":"http://www.soso.com/"
                },
                {
                    "type":"view",
                    "name":"视频",
                    "url":"http://v.qq.com/"
                },
                {
                    "type":"click",
                    "name":"赞一下我们",
                    "key":"V1001_GOOD"
                }]
        }],
    "matchrule":{
        "group_id":"2",
        "sex":"1",
        "country":"中国",
        "province":"广东",
        "city":"广州",
        "client_platform_type":"2"
    }
}
module.exports = function(app){
    app.use(wechat('wechat').middleware(function* (){
        var message = this.weixin;
        console.log('message-->>',message);
        if(message.MsgType === 'text'){
            this.body = "我爱你 老婆";
        }
        //创建菜单
        const createMenu = yield api.addConditionalMenu(menu);
        console.log('createMenu-->>',createMenu);
    }))
}