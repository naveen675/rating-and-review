const express = require('express');
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
            console.log(userId);
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
    const {firstname,lastname,gmail,id} = data;


    if(! firstname){
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

module.exports = router;