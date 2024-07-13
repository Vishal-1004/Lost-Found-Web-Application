// import React from 'react'
import Info from '../components/Info'
import Stats from '../components/Stats'
import Tabs from '../components/Tabs'

function Profile() {
  return (
    <div>
    <div className='py-2  flex flex-col md:flex-row '>
        <Info/>
        <Stats/>
    </div>
    <div>
      <Tabs/>
    </div>
    </div>
  )
}

export default Profile