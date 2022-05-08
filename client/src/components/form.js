import React, { useState } from 'react'

function Form(props) {

    const {setFormVisibility,_id} = props;
    const [rating, setRating] = useState();

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

            fetch(url,requestOptions).then((response) => {console.log(response)});
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
