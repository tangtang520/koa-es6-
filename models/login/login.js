/**
 * Created by tangtang on 16/2/1.
 */
'use strict'
var mongoose = require('mongoose');
//import mongoose from 'mongoose';
var UserSchema = new mongoose.Schema({
    name:String
});
mongoose.model('User',UserSchema);