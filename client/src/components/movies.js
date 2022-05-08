import React, { useState,useEffect } from 'react';
import fetch from 'node-fetch';
import Rating from './rating';
import { useNavigate } from 'react-router-dom';


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
              const {_id,title,actors,genre,director,average_rating,rating_count} = movie;
              
              return (
                  
                  <div key={index} className='movie'>
                    <button onClick={() => {navigate(`/movie/${_id}`)}}>
                        <h1>{title}</h1>
                        <p>{`Actors : ${actors}`}</p>
                        { average_rating > 0? <button><span className='rating'>&#11088;</span> {average_rating}</button> : ""}
                        <button><span className='rating'>&#9734;</span></button>
                        <p className='ratingCount'>{`${rating_count} ratings` }</p>
                        <p>{director}</p>
                    </button>
                  </div>
              )
          })
      }
    </div>
  )
}

export default Movies
