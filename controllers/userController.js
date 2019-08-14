const UserModelSchema = require('../models/users');
const config = require('../database');
const jwt = require('jsonwebtoken');
var Bcrypt = require('bcryptjs');

module.exports = {

    //gets all available users
    getUsers: (req, res) => {
        UserModelSchema.find( (err, users) => {
            if(err){return res.status(400).json({error: err })}
            return res.status(200).json({ users })
        });
    },

    //adds a user to the database
    registerUser: async (req, res) => {
        let errors = {};
        if(!req.body.email){ errors.email = 'Email must be provided'}
        if(!req.body.password){ errors.password = 'Password must be provided'}
        if(Object.keys(errors).length>0){ return res.status(400).json({ errors })}
        try{
            var user = new UserModelSchema({
                email: req.body.email,
                password: Bcrypt.hashSync(req.body.password)
            });
            var result = await user.save();
        } catch (error) {
            res.status(400).json({ error: error })
        } finally {
            return res.status(200).json({ result })
        }
        
    },

    //logins an existing user
    loginUser: (req, res) => {
        let errors = {};
        if(!req.body.email){ errors.email = 'Email must be provided' }
        if(!req.body.password){ errors.password = 'Password must be provided'}
        if(Object.keys(errors).length>0){ return res.status(400).json({ errors })}
        try {
            UserModelSchema.findOne({ email: req.body.email }).select('password').exec( function(err, user){
                if(err){ return res.status(500).json( { errors: err } )}
                if(!user){ return res.status(500).json({ error: 'User not found' })}
                const validPassword = user.passwordVerification(req.body.password)
                if(!validPassword){ return res.status(500).json({ error: 'Invalid password' }); }
                console.log(user, 'user object')
                const token = jwt.sign({
                    user_id: user._id,
                    email: req.body.email
                }, config.secret, { expiresIn: 7890000 });
                res.status(200).json({ token: token});
            })
        } catch (error) {
            res.status(400).json({ error: error })
        }
        
    }
}
