import React from 'react'
import Movies from './movies';
import Header from './header';

function Home() {
  return (

    <React.Fragment>
      <div className='content'>
        <Movies />
      </div>

    </React.Fragment>
  )
}

export default Home;
