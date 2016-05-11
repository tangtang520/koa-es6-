/**
 * Created by tangtang on 16/5/10.
 */
'use strict'
const client = require('../../lib/connect_redis');
var qiniu = require("qiniu");

qiniu.conf.ACCESS_KEY = '0Zx661g2nBzFEk-ABU7IgDkdBpOPdGEqgvS-cqoc';
qiniu.conf.SECRET_KEY = 'ACiT4WAz8zwFZW8ikABDQjRxcmiBNC7dkncEIee3';
//exports.test = function* (){
//    console.log('in--->>');
//    //需要填写你的 Access Key 和 Secret Key

//
////要上传的空间
//    let bucket = 'file';
//
////上传到七牛后保存的文件名
//    let key = 'test.jpg';
//
////构建上传策略函数
//    function uptoken(bucket, key) {
//        var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
//        return putPolicy.token();
//    }
//
////生成上传 Token
//    let token = uptoken(bucket, key);
//    console.log('token',token);
////要上传文件的本地路径
//    filePath = '/Users/tangtang/Desktop/1.jpg'
//
////构造上传函数
//    function uploadFile(uptoken, key, localFile) {
//        var extra = new qiniu.io.PutExtra();
//        qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
//            if(!err) {
//                // 上传成功， 处理返回值
//                console.log('ret-->>',ret);
//            } else {
//                // 上传失败， 处理返回代码
//                console.log(err);
//            }
//        });
//    }
//
////调用uploadFile上传
//    uploadFile(token, key, filePath);
//}

//exports.test = function* (){
////构建私有空间的链接
//    let url = 'http://7xtwr1.com1.z0.glb.clouddn.com/test.jpg';
//    var policy = new qiniu.rs.GetPolicy();
//
////生成下载链接url
//    var downloadUrl = policy.makeRequest(url);
//
////打印下载的url
//    console.log(downloadUrl);
//
//
//}


exports.test = function* (){
    console.log('in-->>');
    //client.setex('name',100,'test',function(err,result){
    //    if(err){
    //        console.log(err);
    //    }else{
    //        console.log('result--->>',result);
    //    }
    //})
    client.get('name',function(err,result){
        if(err){
            console.log('err-->>',err);
        }else{
            console.log('result-->>',result);
        }
    })
}