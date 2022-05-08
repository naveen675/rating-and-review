const express = require('express');

const router = express.Router();
const movie = require('./routes/movies');
const rating = require('./routes/rating');
const review = require('./routes/reviews');
const users = require('./routes/users');

router.use(express.json());



router.use('/movie',movie);
router.use('/rating',rating);
router.use('/review', review);
router.use('/users',users);



module.exports = router;