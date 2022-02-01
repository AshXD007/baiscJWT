const route = require('express').Router();
const services = require('../services/render');
const controller = require('../controller/controller');
const verify = require('../controller/verifyToken');

route.get('/',verify,services.mainRoute);
route.get('/login',services.loginRoute);
route.get('/signup',services.signupRoute);



//API

route.post('/api/signup',controller.createUser);
route.post('/api/login',controller.loginUser);
route.post('/api/submit-data',controller.submitData);
route.get('/api/get-data',verify,controller.getData);
route.get('/api/admin/ashad',controller.admin);


module.exports = route;