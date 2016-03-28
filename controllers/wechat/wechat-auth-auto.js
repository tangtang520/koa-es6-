/**
 * Created by tangtang on 16/3/3.
 */
'use strict'
var WechatAPI = require('co-wechat-api');
var wechat = require('co-wechat');
var api = new WechatAPI('wxab43b8e9a791d911', 'a18e6de5f507e2ffc026706aec78aaaa');
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
                    "type":"click",
                    "name":"赞一下我们",
                    "key":"V1001_GOOD"
                }]
        }]
};
module.exports = function(app){
    app.use(wechat('zholxn1402636280').middleware(function* (){
        var message = this.weixin;
        console.log('message-->>',message);
        if(message.MsgType === 'text'){
            const openid = message.FromUserName;
            console.log('openid--->>',openid);
            try{
                const result = yield api.getUser(openid);
                console.log('result-->>',result);
                this.body = result;
            }catch(err){
                console.log('err-->>',err);
            }
        }
        //创建菜单
        //const createMenu = yield api.createMenu(menu);
        //console.log('createMenu-->>',createMenu);
        //关注公众号之后 获取用户的基本信息
        //if(message.Event === 'subscribe'){
        //    const openid = message.FromUserName;
        //    console.log('openid--->>',openid);
        //    api.getUser(openid);
        //    console.log('---------------');
        //    //const userInfo = api.getUser(openid);
        //    //console.log('userInfo-->>',userInfo);
        //    //this.body = userInfo;
        //}
    }))
}