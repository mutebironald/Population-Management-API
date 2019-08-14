const LocationModelSchema = require('../models/location');
var mongoose = require('mongoose');

module.exports = {
    //adds a location to the database
    addLocation: async (req, res) => {
        
        let errors = { };
        if(!req.body.name){ errors.name = 'You must specify the name of this location'}
        if(!req.body.male){ errors.male = 'You must specify the number of males in this location' }
        if(!req.body.female){ errors.female = 'You must specify the number of females in this location' }
        if(Object.keys(errors).length>0){ return res.status(500).json({ errors })}
        try{
            const locationExists = await LocationModelSchema.findOne({name: req.body.name });
            if(locationExists){ return res.status(422).json({ error: 'The location you want to add already exists'})}
            var residents = parseInt(req.body.male) + parseInt(req.body.female)
            const location = new LocationModelSchema({
                location_name: req.body.name,
                male: req.body.male,
                female: req.body.female,
                residents: residents
            });
            var result = await location.save();

        } catch (error) {
            return res.status(500).json({ error: error })
        } finally {
            return res.status(200).json({ result })
        }
    },

    //updates a specific location
    updateLocation: async (req, res) => {
        let errors = {}
        if(!req.body.name){ errors.name = 'Please specify the location you want to update'}
        if(!req.body.male){ errors.male = 'Please specify the number of males'}
        if(!req.body.female){ error.female = 'Please specify the number of females'}
        if(Object.keys(errors).length>0){ return res.status(500).json({ errors: errors })}
        const locationExists = await LocationModelSchema.findOne({ _id: req.params.id });
        if(!locationExists){ return res.status(422).json({ error: 'The location you want to update does not exist'})}
        locationExists.location_name = req.body.name,
        locationExists.male = req.body.male,
        locationExists.female = req.body.female
        var result = await locationExists.save();
        return res.status(200).json({ result })
    },

    //deletes a location from the database
    deleteLocation: (req, res) => {
        try{
            if(mongoose.Types.ObjectId.isValid(req.params.id))
            LocationModelSchema.findOne({ _id: req.params.id }, (err, location) => {
                if(err){ return res.status(400).json({ error: err })}
                if(!location){ return res.status(400).json({ error: 'The location you want to delete does not exist.'})}
                location.remove((err, location) => {
                    return res.status(200).json({ message: 'Location deleted successfully'})
                });
            });
            else{
                return res.status(400).json({ error: 'The id specified appears faulty'})
            }

        } catch (error) {
            return res.status(400).json({ error: error })
        }
        
    },

    //gets all available locations
    getLocations: (req, res) => {
        LocationModelSchema.find( (err, locations) => {
            if(err){ return res.status(500).json({ errors: err })}
            if(!locations){ return res.status(500).json({ message: 'There are currently no locations available'})}
            return res.status(200).json({ locations })
        });
    },

    //gets a specific location
    getLocation: (req, res) => {
        try{
            if(mongoose.Types.ObjectId.isValid(req.params.id))
            LocationModelSchema.findOne( { _id: req.params.id },(err, location) => {
                if(err){ return res.status(500).json({ error: err })}
                if(!location){ return res.status(500).json({ message: 'The location specified is not available'})}
                return res.status(200).json({ location })
            })
            else {
                return res.status(400).json({ error: 'The id appears faulty' })
            }
        } catch(error){
            return res.status(400).json({ error: error });
        }
    }


}
