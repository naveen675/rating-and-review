const express = require('express');
const app = require('../app');
const userCredentials = require('../models/userCredentials');
const router = express.Router();
const UserCredDb = require('../models/userCredentials')
const User = require('../models/users');
router.use(express.json());


router.delete('/me', (req,res) => {

    delete req.session.userId;
    res.status(204).send();
})


module.exports = router;
