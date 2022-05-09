import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/home';
import Movie  from './components/movie';
import Login from './components/login';
import Profile from './components/profile';
import Error from './components/error';
import Register from './components/signup';
import Header from './components/header';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/movie/:_id' element={<Movie />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/error/:err' element={<Error />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;