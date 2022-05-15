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
    // const [average_rating,setAvgRating] = useState();
    // const [rating_count,setRatingCount] = useState();

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




    const CheckForUser = () => {

       const url = '/api/rating/me';

       const data = {
            "movieId" :_id
        }

        const requestOptions = {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        }

        fetch(url,requestOptions).then((response) => {

            if(response.status === 401 ){

                alert("Session Expired Login Again");
            }

            else if(response.status === 200){
                alert("Rating Already Submitted Thankyou");
            }

            else if(response.status === 204){
                setFormVisibility(true);
            }
            
        })
    }

    // useEffect(() => {
    //     setAvgRating(movie.average_rating);
    //     setRatingCount(movie.rating_count);
    // },[movie])

    

    if(loading){
        
        return (
            <h1>Loading</h1>
        )
    }
    
    const title = movie.title;
    const year = movie.year;
    const id = movie._id;
    const reviews = movie.review;
    const director = movie.director;
    const actors = movie.actors;
    const average_rating = movie.average_rating;
    const rating_count = movie.rating_count;
    const desc = movie.description;
    const genre = movie.genre;
    const videoUrl = `https://www.youtube.com/embed/${movie.video_url}`;





    
    return (
        <React.Fragment>
    <div className='movie'>


        <h1>{title}</h1>
        <iframe src={videoUrl}></iframe>        
        <br></br>
        { average_rating > 0 ? <span className='rating'>&#11088;{average_rating}{'/10'} </span>  : ""}
        <button><span className='rating' onClick={() => {CheckForUser()}}>&#9734; rate</span></button><p className='ratingCount'>{`${rating_count} ratings` }</p>
        {formVisibility && <Form setFormVisibility = {setFormVisibility} _id={_id} value={2} />}
        
         <table>
             <tr>
                 <td><p>{`Year : ${year}`}</p></td>
             </tr>

             <hr></hr>

             <tr>
                 <td><p>ABOUT : {desc}</p></td>
             </tr>
             <hr></hr>
            <tr>
                <td><p>DIRECTOR : {director}</p></td>
            </tr>
            <hr></hr>
            <tr>
                <td><p>ACTORS : {actors}</p></td>
            </tr>
            <hr></hr>
            <tr>
                <td><p>GENRE : {genre}</p></td>
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