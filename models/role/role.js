/**
 * Created by tangtang on 16/5/15.
 */
'use strict'
const mongoose = require('mongoose');
const RoleSchema = new mongoose.Schema({
    name:String,
    roleType:String, //学校 公司 SCHOOL COMPANY
    createTime:{type:Date,default:Date.now()},
    updateTime:{type:Date,default:Date.now()},
    isDelete:{type:Boolean,default:false},
    address:String, //地址
    webUrl:String, //网址
    scale:String, //规模
    business:String, //公司业务
    department:String, //部门
});
mongoose.model('Role',RoleSchema);