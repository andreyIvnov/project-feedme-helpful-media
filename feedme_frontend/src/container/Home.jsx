import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom'

// import Sidebar from '../components/Sidebar';
// import UserProfile from '../components/UserProfile';
import { Sidebar, UserProfile } from '../components';

import Pins from './Pins'
import { userQuery } from '../utils/data'
import { client } from '../client';
import logo from '../assets/logo.png'


const Home = () => {

  //Hooks
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState(null)
  const scrollRef = useRef(null);

  //Get user information from local storage but not the user 
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear() //get the user and PARSE them if they not get it may be something wrong and clear the local storage

  //Gone getting the user from SANITY by using the useEffect
  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, []);

  //
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])



  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">

      <div className="hidden md:flex h-screen flex-initial">
        {/* Mobile SideBar */}
        <Sidebar user={user && user} />
      </div>

      {/* Header  */}
      <div className="flex md:hidden flex-row">

        
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          {/* Menu button */}
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />

          {/* Logo button/icon */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>

          {/* User profile image button/icon */}
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-28" />
          </Link>
        </div>

        {/* Open / Close sideBar*/}
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">

            <div className='absolute w-full flex justify-and items-center p-2'>
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
            </div>

            {/* Desktop SideBar  */}
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>



      {/* Body */}
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>

          <Route path='/user-profile/:userId' element={<UserProfile />} />

          <Route path='/*' element={<Pins user={user && user} />} />

        </Routes>
      </div>

    </div>
  )



}

export default Home 