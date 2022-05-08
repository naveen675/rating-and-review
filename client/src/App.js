import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/home';
import Movie  from './components/movie';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/movie/:_id' element={<Movie />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;