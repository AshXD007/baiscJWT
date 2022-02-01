const mongoose = require('mongoose');


const userData = new mongoose.Schema({
    username:{
        type:String
    },
    fullName:{
        type:String
    },
    work:{
        type:String
    },
    networth:{
        type:String
    },
    momName:{
        type:String
    },
    sheA:{
        type:String
    },
    dadName:{
        type:String
    },
    rickRoll:{
        type:Boolean
    }
})

module.exports = mongoose.model('dataSubmit',userData);