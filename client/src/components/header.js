import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import Entertainment from '../Images/entertainmenr.jpeg'




function Header(props) {
    
  
    

    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState(false);
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

  const GetStatus = () => {

    const url = '/api/sessions/currentSession';

    fetch(url).then(
        (response) => {
          if(response.status === 200){ setLoginStatus(true) }
          else if(response.status === 204 ){ setLoginStatus(false) }
        }

      )
    
  }

  setInterval(GetStatus(), 1000);




  return (
    <div className='header'>
      
      <div className='left'>
        <img src={Entertainment} alt="entertainment" />
      </div>
      <h1>
        Entertainment
      </h1>
      <div className='right'>
        <button onClick={HandleClick}>{loginStatus ? "Logout" :"Login"}</button>
      </div>
    </div>
  )
}

export default Header;
