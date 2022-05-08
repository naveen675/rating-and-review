const express = require('express');
const router = express.Router();
const movieDb = require('../models/movies')
router.use(express.json());


router.put('/',(req,res) => {

    const data  = req.body;
    const {movieId,review} = data;

    movieDb.findOneAndUpdate({'_id' : movieId},{'review' : review}).then((response) => {
        res.status(204).send('Update Completed');
    }).catch((err) => {
        res.status(500).send();
    })
} )

module.exports = router;