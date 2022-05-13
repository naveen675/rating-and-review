const express = require('express');
const router = express.Router();
const movieDb = require('../models/movies');
router.use(express.json());
const auth = require('../middleware/auth');



router.put('/',auth.authenticate,(req,res)=> {

    const data = req.body;
    const {rating,id} = data;
    var average_rating='';
    var rating_count ='';
   

    movieDb.findOne({'_id':id}).then((response) => {

        average_rating = parseInt(response['average_rating']);
        rating_count = parseInt(response['rating_count']);
        rating_count = rating_count+1;
        average_rating = ((parseInt(rating) + average_rating)/(rating_count)).toFixed(1);
   

        movieDb.findOneAndUpdate({'_id': id},{'average_rating':average_rating , 'rating_count': rating_count}).then((response)=> {

        if(response){
            res.status(201).send("Update Completed");
        }
        if(! response){
            res.status(204).send("No movie with provided ID");
        }
    })
    }).catch((err) => {
        res.status(500).send('internal Error');

    


});
})


router.get('/:ID',(req,res) => {

    const movieId = req.params['ID'];
    
    movieDb.findOne({'_id':movieId}).then((response) => {

        res.status(200).send({'rating' : response['rating']});
       
    }).catch((err) => {
        res.status(500).send(err);
    })
})



module.exports = router;