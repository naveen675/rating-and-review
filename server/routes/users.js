const express = require('express');
const userCredentials = require('../models/userCredentials');
const router = express.Router();
const UserCredDb = require('../models/userCredentials')
const User = require('../models/users');
router.use(express.json());


router.post('/user', (req,res) => {

   

    const data = req.body;
    const {username,password,firstname,lastname,gmail} = data;

    const credentials = new UserCredDb({
        'username' : username,
        'password' : password
    })
    credentials.save().then(() => {
       
        UserCredDb.findOne({'username' : username}).then((data) => {

            const userId = data._id;
            //console.log(userId);
            const newEntry = new User({
                 'id' : userId,
                 'username' : username,
                 'firstname' : firstname,
                 'lastname' : lastname,
                 'gmail' : gmail

             })

             newEntry.save().then(() => {res.status(201).send()} )
        }).catch((err) => {
            res.status(500).send(err);
         })
    }
    )

})

router.put('/me', (req,res) => {

    const data = req.body;
    const {firstname,lastname,gmail} = data;

    const id = req.session.userId;

    if(! id){
        res.status(408).send("session expired");
    }
    
    else if(! firstname){
        if(! lastname){
            User.findOneAndUpdate(({'id' : id}, {'gmail' : gmail})).then(() => {res.status(204).send('update Completed')}).catch((err) => {res.status(500).send(err)});
        }
        else{
            User.findOneAndUpdate(({'id' : id}, {'gmail' : gmail, 'lastname' : lastname})).then(() => {res.status(204).send('update Completed')}).catch((err) => {res.status(500).send(err)});
        }
    }
    else if(! lastname){

        if(! gmail){
            
            User.findOneAndUpdate(({'id' : id}, {'firstname':firstname})).then(() => {res.status(204).send('update Completed')}).catch((err) => {res.status(500).send(err)});
        }
        else{
            User.findOneAndUpdate(({'id' : id}, {'firstname':firstname, 'gmail': gmail})).then(() => {res.status(204).send('update Completed')}).catch((err) => {res.status(500).send(err)});
        }
        
    }
    else if(! gmail){

        User.findOneAndUpdate(({'id' : id}, {'firstname':firstname , 'lastname' : lastname})).then(() => {res.status(204).send('update Completed')}).catch((err) => {res.status(500).send(err)});
    }
    else{
        User.findOneAndUpdate(({'id' : id}, {'firstname':firstname , 'lastname': lastname ,'gmail' : gmail})).then(() => {res.status(204).send('update Completed')}).catch((err) => {res.status(500).send(err)});
    }

})


router.post('/session', (req,res) => {

    const data = req.body;
    const {username,password} = data;

    userCredentials.findOne({'username' : username, 'password' : password}).then((data) => {

        if(! data){

            res.status(401).send('User Doesnt exist');
        }
        else {

            req.session.userId = data['_id'];
            
            res.status(200).send("User Logged In");
        }
    }).catch((err) => {
        res.status(500).send(err);
    })
})

module.exports = router;