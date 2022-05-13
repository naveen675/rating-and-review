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
    const username = req.session.username;
  

    const review = {userId : userId,
                    username : username,
                    text : text,

    };
    
    movieDb.findOneAndUpdate({'_id' : movieId},{$addToSet : {review : review}}).then((response) => {
        res.status(204).send('Update Completed');
    }).catch((err) => {
        res.status(500).send();
    })
} )

var final = [];
router.get('/:movieId', (req,res) => {

  

    const {movieId} = req.params;
    const currentUser = req.session.userId;
    var data = [];
 
    
    movieDb.findOne({'_id': movieId}).then((response) => {

       res.status(200).send(response['review']);

    })

})

router.delete('/me', auth.authenticate,(req,res) => {

    const {userId,movieId} = req.body;

    movieDb.updateMany(
    { '_id' : movieId},
    { $pull: { review: { userId: userId } } }
    ).then(
        (response) => {res.status(204).send(
    response)}).catch(
        (err) => {
    console.log(err);
})

})

router.post('/me',auth.authenticate, (req,res) => {


    const {movieId} = req.body;
    const userId = req.session.userId;

        movieDb.find(

           { "_id": movieId,

            "review": {
                "$elemMatch": {
                    "userId": userId,
                }
            }
        }).then((data) => {
        if(data.length>0) {
   
        res.status(200).send();
}
        else if(data.length === 0){

            res.status(204).send();
        }
}).catch((err) => {
    res.status(500).send(err);
})

});

module.exports = router;