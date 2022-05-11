import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

function Form(props) {

    const {setFormVisibility,_id} = props;
    const [rating, setRating] = useState();

    const navigate = useNavigate(); 

    const HandleClick = () => {

        
        
        const data = {

            'rating' : rating,
            'id' : _id
        }

        const requestOptions = {

        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        }
        const url = '/api/rating/'

        const PostData = () => {

            fetch(url,requestOptions).then((response) => {

                if(response.status === 401){
                    alert('Session Expired');
                    navigate('/session');
                }
                else if(response.status === 201){
                    navigate('/profile');
                }
            }).catch((err) => {
                console.log(err);
            })
        }

        PostData();
        setFormVisibility(false);
    

        
    }

  return (
    (
    <div>
        <input type='text' onChange={(event) => {setRating(event.target.value)}}></input>
        <button onClick={() => {HandleClick()}}>Submit</button>
    </div>
    )
  )
}

export default Form
