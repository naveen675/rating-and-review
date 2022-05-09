import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Profile() {

    const navigate = useNavigate();


    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [gmail,setGmail] = useState('');
    const [updateStatus,setUpdateStatus] = useState(false);


    const HandleClick = () => {

         const url = '/api/users/me';

        const data = {
            "firstname" :firstname,
            "lastname" : lastname,
            "gmail" : gmail
        }

    const requestOptions = {

        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        }

    const UpdateInfo = () => {
        fetch(url,requestOptions).then((response) => {
            if(response.status === 204){
                setUpdateStatus(true);
                navigate('/profile');
            }
            else if(response.status === 408){
                alert('Session Expired');
                navigate('/');
            }
        }).catch((err) => {
            navigate(`/error/${err}`);
        })
    }
    UpdateInfo();

    }





  return (

    <div className='profile'>
      <h1>Profile</h1>
      <div className='personalDetails'>
          <label>Firstname</label><input type='text'  onChange={(event) => {setFirstname(event.target.value)}}></input> <br/>
          <label>Lastname</label><input type='text' onChange={(event) => {setLastname(event.target.value)}}></input> <br />
          <label>Gmail</label><input type='text' onChange={(event) => {setGmail(event.target.value)}}></input>
        <button onClick={HandleClick}>Submit</button>
      </div>
      {updateStatus && <h1>Form Submitted </h1>}
      <p>Click here to display Movies </p><button onClick={() => {navigate('/home')}}>Home</button>
    </div>
  )
}

export default Profile
