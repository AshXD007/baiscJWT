const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

//connect mongoDB
const connectDB = require('./server/database/connection');

connectDB();
//use cookie
app.use(cookieParser());
//parse req 

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(jsonParser);
app.use(urlencodedParser);


//set view engine
app.set('view engine','ejs');
//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

//load router
app.use('/',require('./server/routes/router'));



//setup port

app.listen(process.env.PORT , ()=>{
    console.log(`server running on http://localhost:${process.env.PORT}`);
})