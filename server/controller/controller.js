//connect userDb
const userM = require('../model/userModel');
const dataM = require('../model/dataModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//create a new user
exports.createUser = async (req,res)=>{

    //validate req
    if(!req.body){
        res.status(400).send({
            message:"empty data"
        })
        return;
    }
    console.log(req.body);
    //check if user exist
    const emailExist =await userM.findOne({email:req.body.email});
    const usernameExists = await userM.findOne({username:req.body.username});
    if(emailExist) return res.status(400.).send({msg:"user exists"});
    if(usernameExists) return res.status(400.).send({msg:"username taken"});

    //hash the pass word
    const salt = await bcrypt.genSalt(10);
    const hashPassword =  await bcrypt.hash(req.body.password,salt);
    // create a new user
    const user = new userM({
        email:req.body.email,
        username:req.body.username,
        password:hashPassword
    })
    try {
        const savedUser = await user.save();
        res.redirect('/login')
    } catch (error) {
        res.status(400).send(error);
    }


}



exports.loginUser = async(req,res)=>{

    //check if user doesn't exists
    console.log(req.body);
    const user = await userM.findOne({username:req.body.username});
    console.log(await user);
    if(!user) return res.status(400.).send({msg:"username doesn't exists"});

    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send({msg:"Invalid Pass"})

    //get username and id 
    const nameCookie = user.username;

    //assign jwt token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).cookie("token",token,{
        httpOnly:true
    }).cookie('username',nameCookie,{
        httpOnly:true
    }).redirect('/');
}



//submit data

exports.submitData = async (req,res)=>{
    console.log(req.body);
    //validate req
    if(!req.body){
        res.status(400).send({
            message:"empty data"
        })
        return;
    }
    const username = req.cookies.username;
    //check if username exists
    const usernameExists = await dataM.findOne({username:username});
    if(usernameExists) return res.status(400.).send({msg:"data already submitted"});


    //create new data
    let rickRoll = false;
    if(req.cookies.rickRoll == "true") {rickRoll= true};

    const dataSubmit = new dataM({
        username:username,
        fullName:req.body.fullName,
        work:req.body.workAt,
        networth:req.body.networth,
        momName:req.body.mumName,
        sheA:req.body.mumA,
        dadName:req.body.dadA,
        rickRoll:rickRoll
    });

    try {
        const savedUser = dataSubmit.save();
        res.redirect('/api/get-data');
    } catch (error) {
     res.status(400).send(error);   
    }

}



//get data

exports.getData = async(req,res)=>{
    const username = req.cookies.username;

    try {
        const user = await userM.findOne({username:username});
        const data = await dataM.findOne({username:username});
        if(!data) return res.status(400).send("Submit data First");
        res.status(200).send({user:user,data:data});
    } catch (error) {
        res.status(500).send(error);
    }
}



//admin

exports.admin= async(req,res)=>{
    const user = await userM.find();
    const data = await dataM.find();
    try {
        res.send(JSON.stringify({users:user,data:data},null," "))
    } catch (error) {
        res.send(error)
    }
}