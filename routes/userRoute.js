const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController');

//register a new user
userRoute.post('/', userController.registerUser);

//login an existing user
userRoute.post('/login', userController.loginUser);

//get all users
userRoute.get('/', userController.getUsers);


module.exports = userRoute;
