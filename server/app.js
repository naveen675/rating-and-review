const express = require('express');
const app  = express();
const db = require('./db');
const dotenv = require('dotenv');
const { response } = require('express');
dotenv.config();
const api = require('./api');
const port = process.env.PORT || 3001;
const database = process.env.database;
const username = process.env.username;
const password = process.env.password;
const secret = process.env.secret;
const session = require('express-session');
const MongoStore = require('connect-mongo');
const uuid = require('uuid').v4;


app.use(express.json());



// db.connect({
//     username,password,database
// }).then(() => {  
    
    
    // console.log("Connected to MongoDb");
    // app.use('/api',api);

db.connect({username,password,database}).then(() => {
    app.use('/api', session({
        genid : (req) => {
            return uuid();
        },
       
        secret : secret,
        resave: false,
        saveUninitialized : true,
    })
    ,api);
    
}).catch((err) => {
    console.log(`MongoDb connection Unsuccessful ${err}`);

})

    // const movie = new movies({

    //     title: "3 Idiots",
    //     year: "2009",
    //     runtime: "170 min",
    //     genre: "Comedy, Drama",
    //     director: "Rajkumar Hirani",
    //     actors: "Aamir Khan, Madhavan, Sharman Joshi, Kareena Kapoor",
    //     description: 'Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them "idiots".',
    //     poster:
    //     "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    //     imdbRating: "8.4",
    //     review : "Movie is Good",
    //     average_rating : '3.5',
    //     rating_count : '5',
    //     review_count: '5'

    // })
    // movie.save().then(() => {console.log("Execution completed")});

   

// }).catch((err) => {
//     console.log(`error connecting DB ${err}`);
// });

app.get('/', (req,res) => {
    res.send('hello');
})

app.get('/', (req,res) => {

})



app.listen(port, () => {
  console.log(`Server listening at port: ${port}`)
});


module.exports = app;