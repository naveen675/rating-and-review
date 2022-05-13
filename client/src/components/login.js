import React, { useState } from 'react';
import fetch from 'node-fetch';
import {Navigate, useNavigate} from 'react-router-dom';
import {hashString} from 'react-hash-string';
import Header from './header';



function Login(props) {


    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();


    const HandleClick = () => {

    
   

    if(username === ''){
        alert('Username Cannot be empty');

    }
    else if(password === ''){
        alert("Password Cannot be Empty");

    }

    else{

        const url = '/api/users/session';

        const data = {
            "username" :username,
            "password" : hashString(password)
        }

      

        const requestOptions = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
            }

        const Session = () => {

                    fetch(url,requestOptions).then((response) => {
                    
                    if(response.status === 200){
                   
                        navigate(`/profile`);
                    }
                    else if(response.status === 404){
                        alert('Wrong Password');
                    }
                    else if(response.status === 401){
                        alert('User Doesn Exist Please Register');

                    }
                }).catch((err) => {
                    console.log(`Error Occured ${err}`);
                })
            }

            Session();
        }
}

    


  return (
    <>
 
    <div className='login'>
        <h1>Login</h1>
        <div className='loginInput'>
            <table>
                <tr>
                    <td><label >Username : </label></td>

                    <td><input type='text' onChange={(event) => {setUsername(event.target.value)}}></input></td>
                </tr>
                <tr>
                    <td><label>Password : </label></td>
                    <td><input type='password' onChange={(event) => {setPassword(event.target.value)}}></input></td>
                </tr>
                
            </table>
            <button id="loginBtn" onClick={() => {HandleClick()}} >Login</button>
            {/* <button onClick={HandleReset}>Reset</button> */}
            
            <p>New User ? <button id='clickHere' onClick={() => {navigate(`/register`)}}>Click Here</button></p>
        </div>
    </div>
    </>
  )
}

export default Login
