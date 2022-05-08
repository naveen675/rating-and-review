import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import Form from './form';

function Movie() {

    const {_id} = useParams();
    const [loading,setLoading] = useState(true);
    const [movie,setMovie] = useState();
    const [formVisibility,setFormVisibility] = useState(false);

    const GetMovieInfo = () => {
        fetch(`/api/movie/${_id}`).then((response) => {
            return response.json();
        }).then((data) => {
            setMovie(data);
            setLoading(false);
        })
    }
    

    useEffect(() => {
        GetMovieInfo();
    },[formVisibility])

    

    if(loading){
        
        return (
            <h1>Loading</h1>
        )
    }

    const title = movie.title;
    const year = movie.year;
    const average_rating = movie.average_rating;
    const rating_count = movie.rating_count;
    const id = movie._id;
    const review = movie.review;
    
    return (
    <div>
        <p>{title}</p>
        <p>{year}</p>
        { average_rating > 0? <button><span className='rating'>&#11088;</span> {average_rating}</button> : ""}
        <button><span className='rating' onClick={() => {setFormVisibility(true)}}>&#9734;</span></button>
        {formVisibility && <Form setFormVisibility = {setFormVisibility} _id={_id} />}
        <p className='ratingCount'>{`${rating_count} ratings` }</p>
        <p>{review}</p>

    </div>
  )
}

export default Movie
