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
    
    movieDb.findOneAndUpdate({'_id' : movieId},{$addToSet : {review : review}}).then((response) => {
        res.status(204).send('Update Completed');
    }).catch((err) => {
        res.status(500).send();
    })
} )

router.get('/:movieId', (req,res) => {

  

    const {movieId} = req.params;
    const currentUser = req.session.userId;
 
    var final = [];
    movieDb.findOne({'_id': movieId}).then((response) => {

       var data = response['review'];
       
       for(var i=0;i<data.length;i++){

            var id = data[i]['userId'];
            var text = data[i]['text'];
            var temp = {
                'username' : "",
                'text' : ""
            };
                

            userDb.findOne({'id' : id}).then((r) => {
                temp['username'] = r.username;
                temp['text'] = text;
                console.log(temp);
            })

            
       }


       
    }).then((final) => {res.send(final)}).catch((err) => {
        res.status(500).send(err);
    })
})

module.exports = router;