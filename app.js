var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
const jwt = require('jsonwebtoken')

//swagger setup
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    swaggerOptions: {
        validatorUrl: null,
        explorer: true,

      },
    info: {
        title: 'Population Management API',
        version: '1.0.0',
        description: 'This is a Population management Application',
    },
    host: `localhost:3000`,
    basePath: '/api/v1',
};

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: [
        './routes/*.js', //a file with swagger specs written above each implementation 
        ],
};

// initialize swaggerJSDoc generator (outputs swagger docs as JSON to variable)
const specs = swaggerJsdoc(options);

/**
 * configuration setup
 */
const config = require('./database');

/**
 * connects to database
 */
const conn = require('./database/database');

conn.connect();



/**
 * setting up the routes
 */
const userRouter = require('./routes/userRoute');
const locationRouter = require('./routes/locationRoute');

var app = express();

app.use(cors());
// match only json type body
app.use(bodyParser.json({ inflate: true }));

//allow array/string parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

app
.get('/', (req, res) => {
    return res.send('This is a Population Management API, have fun with it')
});


// Server swagger at <apiurl>/docs using swagger-ui-express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//define  users route 
app.use('/api/v1/users', userRouter);

app.use((req, res, next) => {
    const token = req.headers['authorization'];
    // console.log(token, 'where is our token')
    if(!token){
        res.status(400).json({error: 'You are not authorized'})
    }
    // console.log(config.secret, 'secrecy is essential')
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            console.log(err, 'error');
            res.status(400).json({ error: 'Invalid token'})
        }
        req.decoded = decoded;
        // console.log('decoded value', req.decoded);
        next();
    });
});

//define locations route
app.use('/api/v1/locations', locationRouter);


module.exports = app;


