const express = require('express');
const router = express.Router();
const UserCredDb = require('../models/userCredentials')
router.use(express.json());


router.post('/', (req,res) => {

   

    const data = req.body;
    const {username,password} = data;

    const credentials = new UserCredDb({
        'username' : username,
        'password' : password
    })
    credentials.save().then(() => {res.status(201)}).catch((err) => {
        res.status(500).send(err)
    })

})

module.exports = router;