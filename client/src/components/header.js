import React from 'react'
import {useNavigate} from 'react-router-dom';


function Header() {


    const navigate = useNavigate();
    const data = {};

    const HandleClick = () => {

    const url = '/api/sessions/me';

    const requestOptions = {

        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
        }

    const DeleteSession = () => {

        fetch(url,requestOptions).then((response) => {

            if(response.status === 204){

                navigate('/');
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    DeleteSession();
}



  return (
    <div className='header'>
      <button onClick={HandleClick}>Logout</button>
    </div>
  )
}

export default Header;
