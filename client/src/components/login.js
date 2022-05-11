import React, { useState } from 'react';
import fetch from 'node-fetch';
import {Navigate, useNavigate} from 'react-router-dom';


function Login(props) {


    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const status = props.status;
    const navigate = useNavigate();


    const HandleClick = () => {

    const url = '/api/users/session';

    const data = {
            "username" :username,
            "password" : password
        }

    const requestOptions = {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        }

    const Session = () => {

        

            fetch(url,requestOptions).then((response) => {
                
                if(response.status === 200){
                    status = "Logout";
                    navigate(`/profile`);
                }
                else{
                    alert('User Doesn Exist');
                }
            }).catch((err) => {
                console.log(`Error Occured ${err}`);
            })
        }

        Session();
    }


  return (
    <>
  
    <div className='login'>
        <label >username : </label>
        <input type='text' onChange={(event) => {setUsername(event.target.value)}}></input> <br></br>
        <label>Password : </label>
        <input type='text' onChange={(event) => {setPassword(event.target.value)}}></input>
        <button onClick={() => {HandleClick()}} >Login</button><br />
        <p>New User ?</p>
        <button onClick={() => {navigate(`/register`)}}>Click Here</button>
    </div>
    </>
  )
}

export default Login
