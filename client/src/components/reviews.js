import React, { useEffect, useState } from 'react'
import fetch from 'node-fetch';
import { useNavigate } from 'react-router-dom';


function Review(props) {


    const navigate = useNavigate();
    const {movieId} = props;
    const [reviewAvailable,setReviewAvailable] = useState(false);
    const [input,setInput] = useState('');
    const [reviews,setReviews] = useState([]);


    const fetchReviews = () => {

        fetch(`/api/review/${movieId}`).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            setReviews(data);
        })

    }

    useEffect(() => {
        fetchReviews();
    },[]);
   
    const HandleSubmit = () => {

       const url ='/api/review/';

       const data = {
            "movieId" :movieId,
            "text" : input,
        }

        const requestOptions = {

        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        }


        fetch(url,requestOptions).then((response) => {
            
            setReviewAvailable(false);
            if(response.status === 204){
                
                fetchReviews();
            }
            else if(response.status === 401){
                alert('Session expired login Again');
                navigate('/session');
                
            }
        }).catch((err) => {
            console.log(err)
        })


        

    }




    const submitReview = (
        <div>
            <input type='text' onChange={(event) => {setInput(event.target.value)}}></input>
            <button onClick={HandleSubmit}>Submit</button>
        </div>
    )
    


  return (
    <div className='reviews'> 
        <h1>Reviews</h1>

        <button onClick={() => {setReviewAvailable(true)}}>Review</button>
        {reviewAvailable && submitReview}

        {
          reviews.map((review,index) => {

            const {text,userId} = review;
            return (<div key={index} className='review' >
                <h5>{userId}</h5>
                <p >{text}</p>
            </div>
            )
            
          })  
        }
        
    </div>
  )
}

export default Review
