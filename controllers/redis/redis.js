/**
 * Created by tangtang on 16/5/11.
 */
'use strict'
const client = require('../../lib/connect_redis');
let redisDao = {};
module.exports = redisDao;

//setex 设置失效时间方法
redisDao.setex = function(key,ttl,value){
    return Promise.resolve(
        client.setex(key,ttl,value,function(err,result){
            if(!err){
                return result;
            }
        })
    )
};

//get 获取value
redisDao.get = function(key){
    return Promise.resolve(
        client.get(key,function(err,result){
            if(!err){
                return result;
            }
        })
    )
};

//del 删除redis
redisDao.del = function(key){
    return Promise.resolve(
        client.del(key,function(err,count){
            if(!err){
                return count;
            }
        })
    )
}