const {Router, response} = require('express');
const router = Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken');

const {requireAuth} = require('../middleware/authMiddleware')

//login
router.get('/login', (req, res) => {
    console.log('login page request');
    res.send({ express: 'Getting the log in page' }); 

});
//login post credentials
router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    console.log(req.body);

    try{
        const user = await User.login(username, password);
        const token = createToken(user._id);
        console.log(token)
        
        //max age of 3 days
        res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * 3 * 24 * 60 * 60})
        res.status(201).json({user: user._id, token:token})
    }
    catch(err){
         
        if(err.message){
            res.send({error: err.message});
        }else{
            res.status(400).json({err})
        }
        console.log(err.message);
    }
});

//get logout page
router.get('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge : 1});
    res.redirect('/')
});


//get sign up page
router.get('/signup', (req, res) => {
    res.render("signup")
});


//get sign up credentials
router.post('/signup', async (req, res) => {

    console.log(req.body);
    const {username, password} = req.body;

    try{
        const user = await User.signup(username, password);

        const token = createToken(user._id);

        //max age of 3 days
        res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * 3 * 24 * 60 * 60})
        res.status(201).json({user: user._id, token: token})
    }
    catch(err){

        if(err.message){
            res.send({error: err.message});
        }
        else{
            res.status(400).json({err})
        }

    }

});

// create a GET route
router.get('/express_backend', (req, res) => { //Line 9
    console.log("Express backend hit");
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
  });


router.get('/index', requireAuth, (req, res) => {
    console.log(req);
    res.status(201).json({message: "super secret stuff"})
});

//create a JWT , secret should be unique and safe?
const createToken = (id) => {
    return jwt.sign({id}, 'super secret', {
        //maxage of 3 days
        expiresIn: 3 * 24 * 60 * 60
    });
}

module.exports = router;