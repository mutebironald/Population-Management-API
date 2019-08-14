//requirements
// new location contains the total number of male and female residents within it

//locations can be nested within other locations

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const { ObjectId } = Schema

//check if numbers passed into the male/female section.
var validMaleOrFemale = function(number){
    if(!number){ return false; }
    const regExp = new RegExp(/^\d/);
    return regExp.test(number)
}

//male validator message
const maleValidator = [ { validator: validMaleOrFemale, message: 'The Male residents entry must be valid'}]

//female validator message
const femaleValidator = [ { validator: validMaleOrFemale, message: 'The Female residents entry must be valid'}]



//define the location model
var LocationModelSchema = Schema({
    location_name: { type: String, required: true, unique: true },
    male: { type: Number, required: true , validate: maleValidator },
    female: { type: Number, required: true, validate: femaleValidator  },
    residents: { type: Number },
    parent: {
        type:  ObjectId,
        ref: 'LocationModelSchema'
    },

},{
    timestamps: { createdAt: true, updatedAt: false }
}
);



LocationModelSchema.plugin(uniqueValidator);

module.exports = mongoose.model('LocationModelSchema', LocationModelSchema);
