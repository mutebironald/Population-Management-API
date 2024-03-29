var mongoose = require('mongoose');


const Mockgoose = require('mockgoose');

var database = require('./index');


/**
 * helps to connect the system to the database, provides success message when database is connected
 *  and error message when a connection is unsuccessful 
 */
function configureDatabase() {
    mongoose.connect('mongodb://127.0.0.1/pop_mgt', {useNewUrlParser: true, useCreateIndex: true });
    // mongoose.connect(database.uri, {useNewUrlParser: true, useCreateIndex: true });

    db = mongoose.connection;
    db.on('connection', function(){
        console.log('Your connection to Population Management API is now active');
    });

    db.on('error', 
        console.error.bind(console, 'MongoDb connection error')
    )
}

/**
 * wraps Mockgoose around mongoose and changes connection depending on current database.
 * Ideally, it will connect to a different database in testing and development.
 */
function connect(){
    if(process.env.NODE_ENV === 'testing'){
        const mockgoose = new Mockgoose(mongoose);
        return mockgoose.prepareStorage()
        .then( () => {
            configureDatabase()
        })
    } configureDatabase()
}

module.exports = { connect }
