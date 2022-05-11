import React from 'react'
import {useNavigate} from 'react-router-dom';
import Entertainment from '../Images/entertainmenr.jpeg'


function Header(props) {

  const status = props.status


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

                  navigate('/session/');
              }
          }).catch((err) => {
              console.log(err);
          })
    }

    DeleteSession();
}



  return (
    <div className='header'>
      
      <div className='left'>
        <img src={Entertainment} alt="entertainment" />
      </div>
      <h1>
        Entertainment
      </h1>
      <div className='right'>
        <button onClick={HandleClick}>Logout</button>
      </div>
    </div>
  )
}

export default Header;
