import React, { useState } from 'react';   
import {Route, Routes } from 'react-router-dom' 

import { Navbar, Feed, PinDetail, CreatePin, Search} from '../components';

//Get a user data from Home.jsx container
const Pins = ({ user}) => {

  const [searchTherm, setSearchTherm] = useState('')
  
  return (
    <div className='px-2 md:px-5'>

      <div className='bg-gray-50'>
        <Navbar searchTherm={searchTherm} setSearchTherm={setSearchTherm} />
      </div>

      <div className='h-full'>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-detail" element={<PinDetail user={user} />} />
          <Route path="/create-pin" element={<CreatePin user={user} />} />  {/* Need it for know who create a this PIN */}
          <Route path="/search" element={<Search searchTherm={searchTherm} setSearchTherm={setSearchTherm} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Pins