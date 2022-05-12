import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Profile() {

    const navigate = useNavigate();


    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [gmail,setGmail] = useState('');
    const [updateStatus,setUpdateStatus] = useState(false);
    const [update,setUpdate] = useState(false);
    const [userData, setuserData] = useState();


    const PostData = () => {

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
            else if(response.status === 401){
                alert('Session Expired');
                navigate('/session');
            }
        }).catch((err) => {
            navigate(`/error/${err}`);
        })
    }
    UpdateInfo();

    }

    const GetData = () => {

        const url = '/api/users/me';
       fetch(url).then((response) => {
            console.log(response);
        })

       

        return(
            <h1>Hello</h1>
        )

        
    }



    const UpdateProfile = (

        <div className='personalDetails'>
          <form>
            <label>Firstname</label><input type='text'  onChange={(event) => {setFirstname(event.target.value)}}></input> <br/>
            <label>Lastname</label><input type='text' onChange={(event) => {setLastname(event.target.value)}}></input> <br />
            <label>Gmail</label><input type='text' onChange={(event) => {setGmail(event.target.value)}}></input>
            <button onClick={PostData}>Submit</button>
            <button onClick={() => {setUpdate(false)}}>Cancel</button>
        </form>
      </div>
    );





  return (

    <div className='profile'>
      <h1>Profile</h1>
      < GetData />
      <button onClick={() => {setUpdate(true)}}>Update Profile</button>
       {update && UpdateProfile}
      {updateStatus && <h1>Form Submitted </h1>}
      <p>Click here to display Movies </p><button onClick={() => {navigate('/')}}>Home</button>
    </div>
  )
}

export default Profile
