/**
 * Created by tangtang on 16/2/1.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name:String
});
mongoose.model('User',UserSchema);