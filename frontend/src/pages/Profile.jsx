// import React from 'react'
import Info from '../components/Info'
import Stats from '../components/Stats'

function Profile() {
  return (
    <div className='p-4 flex flex-col md:flex-row'>
        <Info/>
        <Stats/>
    </div>
  )
}

export default Profile