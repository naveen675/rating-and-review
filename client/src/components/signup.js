import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

function Register() {


    const [firstname,setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username,setUsername] = useState('');
    const [gmail, setGmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();

    const HandleClick = () => {
        
        const url = '/api/users/user';

        const data = {

            "firstname" : firstname,
            "lastname" : lastname,
            "gmail" : gmail,
            "username" :username,
            "password" : password
        }

        const requestOptions = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        const createUser = () => {

            fetch(url,requestOptions).then((response) => {
            if(response.status === 201){
                navigate('/');
            }
        }).catch((err) => {
            console.log(err);
        })
    }
        createUser();
    }

  return (

     <div className='register'>

        <label>Firstname : </label>
        <input type='text' onChange={(event) => {setFirstname(event.target.value)}}></input> <br></br>
        <label>Lastname : </label>
        <input type='text' onChange={(event) => {setLastname(event.target.value)}}></input><br />
        <label >Gmail : </label>
        <input type='text' onChange={(event) => {setGmail(event.target.value)}}></input> <br></br>
        <label>Username : </label>
        <input type='text' onChange={(event) => {setUsername(event.target.value)}}></input> <br></br>
        <label>Password : </label>
        <input type='text' onChange={(event) => {setPassword(event.target.value)}}></input> <br />
        <button onClick={() => {HandleClick()}} >Register</button><br />

    </div>
  )
}

export default Register;
