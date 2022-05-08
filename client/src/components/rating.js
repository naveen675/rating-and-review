import React, { useEffect, useState } from 'react'
import Form from './form'

function Rating(props) {

    
    // const [rating,setRating] = useState();

    const movie = props.movie;
    const {rating} = movie;
    

    const [formVisibility,setFormVisibility] = useState(false);




  return (
    <div className='rating'>
      { rating > 0? <button><span className='rating'>&#11088;</span> {rating}</button> : ""}
      <button onClick={() => {setFormVisibility(true)}}><span className='rating'>&#9734;</span></button>
      {formVisibility && <Form setFormVisibility = {setFormVisibility} />}
    </div>
  )
}

export default Rating
