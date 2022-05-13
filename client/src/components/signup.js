import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import Header from './header';
import {hashString} from 'react-hash-string';


function Register(props) {

  



    const [firstname,setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username,setUsername] = useState('');
    const [gmail, setGmail] = useState('');
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
            const url = '/api/users/user';

           

            const data = {

                "firstname" : firstname,
                "lastname" : lastname,
                "gmail" : gmail,
                "username" :username,
                "password" : hashString(password)
            }

            const requestOptions = {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }

            const createUser = () => {

                fetch(url,requestOptions).then((response) => {
                
                if(response.status === 200){
                    alert('Username Already Exists')
                }
                else if(response.status === 201){
                    navigate(`/session`);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
            createUser();
        }
}

  return (

    <React.Fragment>
        
     <div className='register'>

         <h1>SignUp</h1>
        <table>
            <tr>
                <td><label>Firstname : </label></td>
                <td><input type='text' onChange={(event) => {setFirstname(event.target.value)}}></input></td> 
            </tr>
            <tr>
                <td><label>Lastname : </label></td> 
                <td><input type='text' onChange={(event) => {setLastname(event.target.value)}}></input></td>
            </tr>
            <tr>
                <td><label >Gmail : </label></td>
                <td><input type='text' onChange={(event) => {setGmail(event.target.value)}}></input></td> 
            </tr>
            <tr>
                <td><label>Username : </label></td>
                <td><input type='text' onChange={(event) => {setUsername(event.target.value)}}></input> </td>
            </tr>
            <tr>
                <td><label>Password : </label></td>
                <td><input type='password' onChange={(event) => {setPassword(event.target.value)}}></input> </td>
            </tr>
            <tr>
                <button id='registerbtn' onClick={() => {HandleClick()}} >Register</button>
            </tr>
        </table>

    </div>

    </React.Fragment>
  )
}

export default Register;
