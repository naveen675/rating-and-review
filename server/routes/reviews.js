const express = require('express');
const { authenticate } = require('../middleware/auth');
const router = express.Router();
const movieDb = require('../models/movies')
const userDb = require('../models/users');
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

router.get('/:movieId', (req,res) => {

  

    const {movieId} = req.params;
    const currentUser = req.session.userId;
 

    movieDb.findOne({'_id': movieId}).then((response) => {

       // var data = response['review'];

        //console.log(data);

        // for(var i =0; i<data.length;i++){
            
        //     userDb.findOne({'id' : data[i]['userId']}).then((res) => {
                
        //         data[i]['userId'] = data[i].userId +'-' + res.username;
        //     })

          

      // }
        res.status(200).send(response['review']);
       
    }).catch((err) => {
        res.status(500).send(err);
    })
})

module.exports = router;