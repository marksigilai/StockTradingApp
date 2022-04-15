const {Router, response} = require('express');
const router = Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const axios = require('axios');
const {requireAuth} = require('../middleware/authMiddleware')

//user account info - balance, list of stocks owned
router.post('/useraccount', (req, res) => {

    console.log(req.body);
    const {userid} = req.body;

    let url = "http://transaction_server:5000/useraccount";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
        }
    })
    .then(function (response) {
        console.log(response.data)
        res.status(201).json(response.data)
    })
    .catch(function (error) {
        res.status(201).json(error)
    })

    console.log('balance requested');

});

//get list of users stocks
router.post('/getstocks', (req, res) => {
    const {userid} = req.body;

    let url = "http://transaction_server:5000/userstocks";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
        }
    })
    .then(function (response) {
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json(error)
    })

    console.log('list of stocks requested');

});



//add amount
router.post('/add', (req, res) => {
    const {userid, amount} = req.body;

    let url = "http://transaction_server:5000/ADD";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
            amount: amount
        }
    })
    .then(function (response) {
        res.status(201).json(response.data)
    })
    .catch(function (error) {
        console.log(error)
        res.status(201).json(error)
    })

    console.log('add amount requested');

    res.end
});

//quote
router.post('/quote', (req, res) => {

    console.log(req.body);
    const {userid, stock} = req.body;

    let url = "http://transaction_server:5000/QUOTE";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
            stock: stock
        }
    })
    .then(function (response) {
        console.log(response.data);
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json(error)
    })

});



//buy
router.post('/buy', async (req, res) => {
    const {userid, stock, amount} = req.body;
    console.log(userid);
    console.log(stock);
    console.log(amount);
    let url = "http://transaction_server:5000/BUY";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
            stock: stock,
            amount: amount
        }
    })
    .then(function (response) {
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json(error)
    })

});

//sell
router.post('/sell', (req, res) => {
    console.log(req.body);
    const {userid, stock, amount} = req.body;

    console.log(stock)
    let url = "http://transaction_server:5000/SELL";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
            stock: stock,
            amount: amount
        }
    })
    .then(function (response) {

        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })


    console.log('sell requested');

});



//commit buy
router.post('/commitbuy', (req, res) => {
    console.log(req.body);
    const {userid} = req.body;

    let url = "http://transaction_server:5000/COMMIT_BUY";

    axios({
        method:'POST',
        url,
        data: {
            id: userid
        }
    })
    .then(function (response) {
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })

});


//cancel buy
router.post('/cancelbuy', (req, res) => {
    console.log(req.body);
    const {userid} = req.body;

    let url = "http://transaction_server:5000/CANCEL_BUY";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
        }
    })
    .then(function (response) {
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })

});


//commit sell
router.post('/commitsell', (req, res) => {
    console.log(req.body);
    const {userid} = req.body;

    let url = "http://transaction_server:5000/COMMIT_SELL";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
        }
    })
    .then(function (response) {

        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })


    console.log('commit sell requested');

});

    
//cancel sell
router.post('/cancelsell', (req, res) => {
    console.log(req.body);
    const {userid} = req.body;

    let url = "http://transaction_server:5000/CANCEL_SELL";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
        }
    })
    .then(function (response) {
        // console.log("Cancel sell response --> " + response)
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })

    // console.log('cancel sell requested');

});

//set buy amount
router.post('/setbuyamount', (req, res) => {
    console.log(req.body);
    const {userid, stock, amount} = req.body;

    let url = "http://transaction_server:5000/SET_BUY_AMOUNT";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
            stock: stock,
            amount: amount
        }
    })
    .then(function (response) {
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })

});

//set buy trigger
router.post('/setbuytrigger', async (req, res) => {

    const {userid, stock, amount} = req.body;

    let url = "http://transaction_server:5000/SET_BUY_TRIGGER";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
            stock: stock,
            amount: amount
        }
    })
    .then(function (response) {
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })

});

//cancel set buy
router.post('/cancelsetbuy', (req, res) => {

    const {userid, stock} = req.body;

    let url = "http://transaction_server:5000/CANCEL_SET_BUY";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
            stock: stock
        }
    })
    .then(function (response) {
        // console.log("Cancel set buy response --> " + response)
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })

});

//set sell amount
router.post('/setsellamount', (req, res) => {

    const {userid, stock, amount} = req.body;

    let url = "http://transaction_server:5000/SET_SELL_AMOUNT";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
            stock: stock,
            amount: amount
        }
    })
    .then(function (response) {
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })
});

//set sell trigger
router.post('/setselltrigger', (req, res) => {

    const {userid, stock, amount} = req.body;

    let url = "http://transaction_server:5000/SET_SELL_TRIGGER";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
            stock: stock,
            amount: amount
        }
    })
    .then(function (response) {
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })

});
      

//cancel set sell 
router.post('/cancelsetsell', (req, res) => {
    console.log(req.body);
    const {userid, stock} = req.body;

    let url = "http://transaction_server:5000/CANCEL_SET_SELL";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
            stock: stock,
        }
    })
    .then(function (response) {
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })

});
      

//dumplog
router.post('/dumplog', (req, res) => {
    console.log(req.body);
    const {filename} = req.body;

    let url = "http://transaction_server:5000/DUMPLOG";

    axios({
        method:'POST',
        url,
        data: {
            filename: filename
        }
    })
    .then(function (response) {
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })

});

router.post('/userdumplog', (req, res) => {
    console.log(req.body);
    const {userid, filename} = req.body;

    let url = "http://transaction_server:5000/USER_DUMPLOG";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
            filename: filename
        }
    })
    .then(function (response) {
        res.status(201).json(response.data)
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })

});

//display summary
router.post('/displaysummary', (req, res) => {

    const {userid} = req.body;
        
    let url = "http://transaction_server:5000/DISPLAY_SUMMARY";

    axios({
        method:'POST',
        url,
        data: {
            id: userid,
        }
    })
    .then(function (response) {

        //console.log(JSON.parse(response.data.replace('\\', '')))
        res.status(201).send(JSON.parse(response.data.replace('\\', '')))
    })
    .catch(function (error) {

        res.status(201).json({data: error})
    })


});
                          


//create a JWT , secret should be unique and safe?
const createToken = (id) => {
    return jwt.sign({id}, 'super secret', {
        //maxage of 3 days
        expiresIn: 3 * 24 * 60 * 60
    });
}

module.exports = router;