const mongoose = require('mongoose');

const userAuth = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:5
    },
    password:{
        type:String,
        required:true,
        minlength:true
    }
})
const userModel = mongoose.model('users',userAuth);
module.exports = userModel;