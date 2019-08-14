const express = require('express');
const locationController = require('../controllers/locationController');
const locationRoute = express.Router();



//gets the specified location
/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     tags:
 *       - Locations
 *     description: Gets a particular location based on its id
 *     content:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema: 
 *            type: string
 *         required: true
 *         description: This is your authorization token 
 *       -  in: path
 *          name: id
 *          schema: 
 *              type: string
 *          required: true
 *          description: The location id you want to retrieve
 *     responses:
 *       200:
 *         description: Return  a particular location
 */
locationRoute.get('/:id', locationController.getLocation);

//updates the specified location
/**
 * @swagger
 * /locations/{id}:
 *   put:
 *     tags:
 *       - Locations
 *     description: Updates a particular location based on its id
 *     content:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema: 
 *            type: string
 *         required: true
 *         description: This is your authorization token 
 *       -  in: path
 *          name: id
 *          schema: 
 *              type: string
 *          required: true
 *          description: The location id you want to update
 *       - in: body
 *         name: location
 *         description: The location object
 *         schema: 
 *              type: object
 *              properties:
 *                  name:
 *                      type: String
 *                  female: 
 *                      type: String
 *                  male:
 *                      type: String
 *              example:
 *                  name: Bond
 *                  female: 54
 *                  male: 54
 *     responses:
 *       200:
 *         description: The location specified has been updated
 */
locationRoute.put('/:id', locationController.updateLocation);

//deletes the specified location
/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     tags:
 *       - Locations
 *     description: Deletes a particular location based on its id
 *     content:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema: 
 *            type: string
 *         required: true
 *         description: This is your authorization token 
 *       - in: path
 *         name: id
 *         schema: 
 *              type: string
 *         required: true
 *         description: The location id you want to remove or delete
 *     responses:
 *       201:
 *         description: The location specified has been updated
 */
locationRoute.delete('/:id', locationController.deleteLocation);

//adds a location
/**
 * @swagger
 * /locations:
 *   post:
 *      tags:
 *         - Locations
 *      description: This should add a location to the database
 *      content:
 *       - application/json
 *      parameters:
 *       - in: header
 *         name: authorization
 *         schema: 
 *            type: string
 *         required: true
 *         description: This is your authorization token 
 *       - in: body
 *         name: location
 *         description: The location Object
 *         schema: 
 *              type: object
 *              properties:
 *                       name: 
 *                          type: String
 *                       female: 
 *                          type: String
 *                       male:
 *                          type: String
 *              example:
 *                      name: Lukas
 *                      female: 30
 *                      male: 20
 *         
 *      responses:
 *       201:
 *         description: The location has been created
 */
locationRoute.post('/', locationController.addLocation);

//gets all available locations
/**
 * @swagger
 * /locations:
 *   get:
 *     tags:
 *       - Locations
 *     description: Get all existing locations
 *     content:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema: 
 *            type: string
 *         required: true
 *         description: This is your authorization token 
 *     responses:
 *       200:
 *         description: Return all available locations 
 */
locationRoute.get('/', locationController.getLocations);

module.exports = locationRoute;
