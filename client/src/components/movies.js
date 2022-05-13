import React, { useState,useEffect } from 'react';
import fetch from 'node-fetch';
import Rating from './rating';
import Header from './header';
import { useNavigate,Link } from 'react-router-dom';
import SearchIcon from '../Images/search-24px.svg';


function Movies(props) {


    const navigate = useNavigate();
    const [searchWord,setSearchWord] = useState('');
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

    const WordMatch = (event) => {

    setSearchWord(event.target.value);

    
    if(searchWord === ''){

      Getmovies();
    }

    

    else{
        var newMovies= [];
        // console.log(word);

        newMovies = movies.filter((movie) => {
        return (movie['title'].toLocaleLowerCase().startsWith(searchWord.toLocaleLowerCase()));
        })

        setMovies(newMovies);
        
        }
  }



  return (
    <>
    <div className='search'>

        <div className='search'>
          <input type='text' className='searchBox' placeholder='Search For Movie' value={searchWord} onChange={(event) => {setSearchWord(event.target.value)}} />
          <button className='searchBtn' onClick={(event) => {WordMatch(event)}} ><img src={SearchIcon} alt="search" /></button> 
        </div>

    </div>
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
    </>
  )
}

export default Movies
