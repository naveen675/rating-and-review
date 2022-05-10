const mongoose = require('mongoose');
const {Schema} = mongoose;


const movie = new Schema({

    title: String,
    year: String,
    runtime: String,
    genre: String,
    director: String,
    actors: String,
    description: String,
    poster: String,
    rating: String,
    review : String,
    average_rating : String,
    rating_count : String,
    review : Array,
    review_count: String

})

module.exports = mongoose.model('movies',movie);