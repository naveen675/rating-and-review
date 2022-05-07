const express = require('express');

const router = express.Router();
const movie = require('./routes/movies');
const rating = require('./routes/rating');

router.use(express.json());



router.use('/movie',movie);
router.use('/rating',rating);



module.exports = router;