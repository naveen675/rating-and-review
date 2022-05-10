const express = require('express');
const { authenticate } = require('../middleware/auth');
const router = express.Router();
const movieDb = require('../models/movies')
router.use(express.json());
const auth = require('../middleware/auth');



router.put('/',auth.authenticate,(req,res) => {

    const data  = req.body;

    const {movieId,text} = data;
    const userId = req.session.userId;

    const review = {userId : userId,
                    text : text
    };
    console.log(review)
    
    movieDb.findOneAndUpdate({'_id' : movieId},{$addToSet : {review : review}}).then((response) => {
        res.status(204).send('Update Completed');
    }).catch((err) => {
        res.status(500).send();
    })
} )

router.get('/:movieId', auth.authenticate, (req,res) => {

  

    const {movieId} = req.params;
    const currentUser = req.session.userId;
 

    movieDb.findOne({'_id': movieId}).then((response) => {

        res.status(200).send(response['review'])

        // const data = response['review'];
        // var filterUser = {};
        
        // for(var i =0; i< data.length; i++){

        //     console.log(filterUser);

        //     if(data[i].userId === currentUser){


        //         filterUser = data[i];
                
        //         break;

        //     }
        // }
        // var updatedreviews = data.filter((user) => {
        //     return (user.userId !== filterUser.userId)
        // })
        // //console.log(updatedreviews);
        // updatedreviews.slice(0,0,filterUser);

        // res.send(updatedreviews);
       
    }).catch((err) => {
        res.status(500).send(err);
    })
})

module.exports = router;