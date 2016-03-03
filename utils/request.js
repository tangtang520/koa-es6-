/**
 * Created by tangtang on 16/2/25.
 */
var urllib = require('urllib');
function* httpRequest(url,type,params){
    return new Promise(function(resolve,reject){
        urllib.request(url,{
            method:type,
            headers: {
                'Content-Type': 'application/json'
            },
            data:params
        },function(err,result){
            if(err){
                reject(err);
            }else{
                resolve(result)
            }
        })
    })
};
exports.get = function* (url,params){
    return yield httpRequest(url,'GET',params);
};
exports.post = function* (url,params){
    return yield httpRequest((url,'POST',params))
}