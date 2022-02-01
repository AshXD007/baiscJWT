const verify = require('../controller/verifyToken');

//main 

exports.mainRoute = async (req,res) =>{
    res.render("main")
}


//login

exports.loginRoute = (req,res) =>{
    res.render('login')
}

//signup

exports.signupRoute = (req,res) =>{
    res.render('signup')
}


