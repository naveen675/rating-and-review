import React, { useState,useEffect } from 'react';
import fetch from 'node-fetch';
import Rating from './rating';
import { useNavigate,Link } from 'react-router-dom';


function Movies() {

    const navigate = useNavigate();

    const [movies,setMovies] = useState([]);

    const Getmovies = () => {
        
        const uri = '/api/movie/'
        fetch(uri).then((response) => {
            return response.json();
        }).then((data) => {

            setMovies(data);
        });
    }
    useEffect(() => {
        Getmovies();
    },[]);



  return (
    <div className='movielist'>
      {
          movies.map((movie,index) => {
              const {_id,title,actors,genre,director,average_rating,rating_count,poster} = movie;
              
              return (
                  
                  <div key={index} className='movie'>
                    <button onClick={() => {navigate(`/movie/${_id}`)}}>
                        <img src={poster} alt="poster" ></img><br /></button>
                        <Link  id="movieLink" to='/movie/${_id}' >{title}</Link><br /><br />
                        { average_rating > 0? <span className='rating'>&#11088;{average_rating} </span> : ""}
                        <p className='ratingCount'>{`${rating_count} ratings` }</p>
                        <p>{director}</p>
                  </div>
              )
          })
      }
    </div>
  )
}

export default Movies
