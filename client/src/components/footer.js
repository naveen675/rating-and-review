import React from 'react'
import Data from './data';

function Footer() {
  return (
    <div className='footer'>
      {
          Data.map((element,index) => {
              const {alt,src,title,href} = element;

              return (
                  <div key={index} className='item' >
                      <a href={href} ><img src={src} alt={alt} title={title}></img></a>
                    </div>
              )
          } )
      }
    </div>
  )
}

export default Footer
