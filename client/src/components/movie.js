import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import Form from './form';
import Review from '../components/reviews';

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
    const reviews = movie.review;
    const videoUrl = `https://www.youtube.com/embed/${movie.video_url}`;


    
    return (
    <div className='movie'>

        <iframe 
                src={videoUrl}>
</iframe>
        <p>{title}</p>
        <p>{year}</p>
        { average_rating > 0? <button><span className='rating'>&#11088;</span> {average_rating}</button> : ""}
        <button><span className='rating' onClick={() => {setFormVisibility(true)}}>&#9734;</span></button>
        {formVisibility && <Form setFormVisibility = {setFormVisibility} _id={_id} />}
        <p className='ratingCount'>{`${rating_count} ratings` }</p>
    <div className='reviews'>

        <Review reviews={reviews} movieId={id} />

    </div>
    </div>
  )
}

export default Movie