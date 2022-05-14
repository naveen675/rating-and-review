import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import { useNavigate } from 'react-router-dom';
import person from "../Images/person.png";


function Review(props) {


    const navigate = useNavigate();
    const {movieId} = props;
    const [reviewAvailable,setReviewAvailable] = useState(false);
    const [input,setInput] = useState('');
    const [reviews,setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState();


    const fetchReviews = () => {

        fetch(`/api/review/${movieId}`).then((response) => {
            return response.json();
        }).then((data) => {
            
            setReviews(data);
        })

    }

    const fetchCurrentUser = () => {

        const url = '/api/sessions/currentSession';

        fetch(url).then(
            (response) => {

                return response.json();
           
    }).then((data) => {setCurrentUser(data['userId'])} );
}

    

    useEffect(() => {
        fetchReviews();
        fetchCurrentUser();
        
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
            console.log(err);
        })


        

    }

    const RemoveReview = (userId) => {


        const url ='/api/review/me';

       const data = {
            "movieId" :movieId,
            "userId" : userId
        }

        const requestOptions = {

        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        }


        fetch(url,requestOptions).then((response) => {
            
            if(response.status === 204){
                
                fetchReviews();
            }
            else if(response.status === 401){
                alert('Session expired login Again');
                navigate('/session');
                
            }
        }).catch((err) => {
            console.log(err);
        })

    }

    const CheckForUser = () => {

       const url = '/api/review/me';

       const data = {
            "movieId" :movieId
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
                alert("Review Already Submitted Delete current review to Submit new");
            }

            else if(response.status === 204){
                setReviewAvailable(true);
            }
            
        })
    }

    const submitReview = (
        
        <div className='reviewBox'>
            <textarea onChange={(event) => {setInput(event.target.value)}}></textarea><br></br>
            <button onClick={HandleSubmit}>Submit</button>
            <button onClick={() => {setReviewAvailable(false);}}>Cancel</button>
        </div>
    )

   


  return (
    <div className='reviews'> 
        <h1>Reviews</h1>

        <button id="reviewBtn" onClick={() => {CheckForUser()}}>Write Review</button>
        {reviewAvailable && submitReview}

        {
          reviews.map((review,index) => {

            const {text,username,userId} = review;
            return (<div key={index} className='review' >
                <h4><img src={person} />{username || "Unknown"}</h4>
                <p>{text}</p>
                
                {(currentUser === userId ) && <button id="DeleteBtn" onClick={() => {RemoveReview(userId)}}>Delete</button>}
                
            </div>
            )
            
          })  
        }
        
    </div>
  )
}

export default Review
