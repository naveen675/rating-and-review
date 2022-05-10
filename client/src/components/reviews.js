import React, { useEffect, useState } from 'react'
import fetch from 'node-fetch';


function Review(props) {


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
        })


        

    }




    const submitReview = (
        <div>
            <input type='text' onChange={(event) => {setInput(event.target.value)}}></input>
            <button onClick={HandleSubmit}>Submit</button>
        </div>
    )
    


  return (
    <div> 
        <h1>Reviews</h1>
        {
          reviews.map((review,index) => {

            const {text,userId} = review;
            return (<p key={index}>{`${userId} : ${text}`}</p>)
            
          })  
        }
        <button onClick={() => {setReviewAvailable(true)}}>Review</button>
        {reviewAvailable && submitReview}
    </div>
  )
}

export default Review
