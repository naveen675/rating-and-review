import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import Form from './form';
import Header from './header';
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
    const director = movie.director;
    const actors = movie.actors;
    const videoUrl = `https://www.youtube.com/embed/${movie.video_url}`;


    
    return (
        <React.Fragment>
    <div className='movie'>


        <h1>{title}</h1>
        <iframe src={videoUrl}></iframe>        
        <br></br>
        { average_rating > 0 ? <span className='rating'>&#11088;{average_rating}{'/10'} </span>  : ""}
        <button><span className='rating' onClick={() => {setFormVisibility(true)}}>&#9734;</span></button><p className='ratingCount'>{`${rating_count} ratings` }</p>
        {formVisibility && <Form setFormVisibility = {setFormVisibility} _id={_id} value={2} />}
        
         <table>
             <tr>
                 <td><p>{`Year : ${year}`}</p></td>
             </tr>
             <hr></hr>
            <tr>
                <td><p>DIRECTOR : {director}</p></td>
            </tr>
            <hr></hr>
            <tr>
                <td><p>ACTORS : {actors}</p></td>
            </tr>
        </table>
        
    <div className='reviews'>

        <Review reviews={reviews} movieId={id} />

    </div>
    </div>
    </React.Fragment>
  )
}

export default Movie