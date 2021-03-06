import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/home';
import Movie  from './components/movie';
import Login from './components/login';
import Profile from './components/profile';
import Error from './components/error';
import Register from './components/signup';
import Header from './components/header';
import Review from './components/reviews';
import Footer from './components/footer';
import { useState } from 'react';

function App() {

  const [user,setUser] = useState('');

  return (
    <BrowserRouter>
      <Header user ={user} setUser ={setUser} />
      <Routes>
        <Route path='/session' element={<Login setUser = {setUser} /> } />
        <Route path='/movie/:_id' element={<Movie />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/error/:err' element={<Error />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/reviews' element={<Review />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;