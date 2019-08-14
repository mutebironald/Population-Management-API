const express = require('express');
const locationController = require('../controllers/locationController');
const locationRoute = express.Router();



//gets the specified location
locationRoute.get('/:id', locationController.getLocation);

//updates the specified location
locationRoute.put('/:id', locationController.updateLocation);

//deletes the specified location
locationRoute.delete('/:id', locationController.deleteLocation);

//adds a location
locationRoute.post('/', locationController.addLocation);

//gets all available locations
locationRoute.get('/', locationController.getLocations);

module.exports = locationRoute;
