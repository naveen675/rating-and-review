import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './frm.css';



function Form(props) {

    const {_id,setFormVisibility,value} = props;
    const [rating, setRating] = React.useState(parseInt(value) || 0);
    const navigate = useNavigate();
    
    const Star = ({ marked, starId }) => {

    return (
        <span style={{ cursor:"pointer"}} data-star-id={starId} className="star" role="button">
        {marked ? '\u2605' : '\u2606'}
        </span>
    );

    }

    const StarRating = ({ value }) => {
    
    const [selection, setSelection] = React.useState(0);

    const hoverOver = event => {
        let val = 0;
        if (event && event.target && event.target.getAttribute('data-star-id'))
        val = event.target.getAttribute('data-star-id');
        setSelection(val);

        
    };

    
        return (
            <div 
            onMouseOut={() => hoverOver(null)}
            onClick={e => setRating(e.target.getAttribute('data-star-id') || rating)}
            onMouseOver={hoverOver}
            >
            {Array.from({ length: 10 }, (v, i) => (
                <Star
                starId={i + 1}
                key={`star_${i + 1}`}
                marked={selection ? selection >= i + 1 : rating >= i + 1}
                />
            ))}
            </div>

    );
    };



    const HandleClick = (rating) => {

        
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
                    navigate(`/movie/${_id}`);
                }
            }).catch((err) => {
                console.log(err);
            })
        }

        PostData();
        setFormVisibility(false);
    

        
    }

    return (
        <div className='ratingForm' >
            <React.Fragment>
                <StarRating value={value} />
                <div>
                    <button onClick={() => {HandleClick(rating)}}>Submit</button>
                    <button onClick={() => {setFormVisibility(false)}}>Cancel</button>
                </div>
            </React.Fragment>
        </div>
        
    )


}





  //const HandleClick = () => {

        
    //     const data = {

    //         'rating' : rating,
    //         'id' : _id
    //     }

    //     const requestOptions = {

    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    //     }
    //     const url = '/api/rating/'

    //     const PostData = () => {

    //         fetch(url,requestOptions).then((response) => {

    //             if(response.status === 401){
    //                 alert('Session Expired');
    //                 navigate('/session');
    //             }
    //             else if(response.status === 201){
    //                 navigate('/profile');
    //             }
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    //     }

    //     PostData();
    //     setFormVisibility(false);
    

        
    // }
//}

export default Form
