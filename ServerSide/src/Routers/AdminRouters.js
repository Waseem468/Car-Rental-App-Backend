const express=require('express');
const Router=express.Router();
const {AdminLoginMethod,AdminRegisterMethod}=require('../Controller/AdminController')

Router.post('/register',AdminRegisterMethod);
Router.post('/login',AdminLoginMethod);

module.exports = Router;