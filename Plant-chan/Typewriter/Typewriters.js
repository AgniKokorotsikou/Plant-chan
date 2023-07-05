import React from 'react'
import Typewriter from 'typewriter-effect';
import './Typewriter.css'

function Typewriters(){
  return(
    <div className='container'>
      <h1>
        Typewriter
          options={{
            autoStart: true,
            loop: true,
            delay: 80,
            strings: ["I am a web developer"]
          }}
        />
      </h1>
    </div>
  )
}

export default Typewriters;