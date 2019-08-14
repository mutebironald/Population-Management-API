const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController');

//register a new user
/**
 * @swagger
 * /users:
 *   post:
 *      tags:
 *         - Users
 *      description: This should add a user
 *      content:
 *       - application/json
 *      parameters:
 *       - in: body
 *         name: user
 *         description: The user Object
 *         schema: 
 *              type: object
 *              properties:
 *                        email: 
 *                          type: String
 *                          format: email
 *                        password: 
 *                          type: String
 *                          writeOnly: true
 *              example:
 *                      email: johndahl@gmail.com
 *                      password: Hanudsj5j#
 *         
 *      responses:
 *       201:
 *         description: Created
 */
userRoute.post('/', userController.registerUser);

//login an existing user
/**
 * @swagger
 * /users/login:
 *   post:
 *      tags:
 *         - Users
 *      description: This should login a pre-existing user
 *      content:
 *       - application/json
 *      parameters:
 *       - in: body
 *         name: user
 *         description: The user Object
 *         schema: 
 *              type: object
 *              properties:
 *                        email: 
 *                          type: String
 *                          format: email
 *                        password: 
 *                          type: String
 *                          writeOnly: true
 *              example:
 *                      email: johndahl@gmail.com
 *                      password: Hanudsj5j#
 *         
 *      responses:
 *       201:
 *         description: logged in
 */
userRoute.post('/login', userController.loginUser);

//get all users
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Get all users
 *     content:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return saved users
 */
userRoute.get('/', userController.getUsers);


module.exports = userRoute;
