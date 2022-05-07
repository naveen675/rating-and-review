const express = require('express');
const router = express.Router();
const movieDb = require('../models/movies')
router.use(express.json());


router.put('/',(req,res)=> {

    const data = req.body;
    const {rating,id} = data;

    movieDb.findOneAndUpdate({'_id': id},{'rating':rating}).then((response)=> {
        if(response){
            res.status(201).send("Update Completed");
        }
        if(! response){
            res.status(204).send("No movie with provided ID");
        }
    }).catch((err) => {
        res.status(500).send('internal Error');
    });


})



module.exports = router;