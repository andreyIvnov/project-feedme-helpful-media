import React from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'
import feedVideo from '../assets/feed.mp4'
import logo from '../assets/logo.png';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle= (response) => {

    

    // console.log(response.profileObj);  // Check if the the google is open a Google Authenticator window

    
    
    //Store the account data on local storage
    localStorage.setItem('user', JSON.stringify(response.profileObj));

    
    
    //Take a some properties from Google account
    const {name, googleId, imageUrl } = response.profileObj

    
    
    //Create a new User Sanity Document (User schema)
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
      location: 'Im Here'
    }
    
    
    
    client.createIfNotExists(doc)
      .then(() => {
        navigate('/',{replace : true})  //If the Response Google is successful is navigate as to home page (localhost:3000)
      })

  }

  return (
    //Video on a backGround
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video 
          src={feedVideo}
          type="video/mp4"
          loop
          controls={false}                      ///For no controllers on video
          muted
          autoPlay  
          className='w-full h-full object-cover' /// Video is change a size by browser size auto-size-change
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay"> {/*/ The black level above a video*/}
                  
          {/*LOGO div */}
          <div className="p-5">
            <img src={logo} width="150px" alt="logo"/>
          </div>
          
          {/* Google Authenticator div */}
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (            //callback function for a Sign In button
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none" //CSS configs for button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}  // disable the button after clicked 
                >
                  <FcGoogle className='mr-4'/> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}      //if login is SUCCESS call the responseGoogle() function
              onFailure={responseGoogle}      //if login is FAILED call the responseGoogle() function
              cookiePolicy="single_host_origin"
            />
          </div>

        </div>
      </div>
    </div>


  )
}

export default Login