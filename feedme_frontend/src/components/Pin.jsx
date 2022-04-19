import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'   //For create a unique ID for each one of the posts 
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { fetchUser } from '../utils/fetchUser'

import { client, urlFor } from "../client" // for get a DATA (image) from  BACKEND (sanity)

const Pin = ({ pin: { postedBy, image, _id, location, destination, save} }) => {
  const [postHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();
  const user = fetchUser()

  //If user saved the post before checking 
  const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user.googleId))?.length //The "!!" return the boolean value (true or false)

  //For saving a Post on the current user
  const savePin = (id) => {
    if(!alreadySaved) {

      client  
        .patch(id)
        .setIfMissing({ save: []})
        .insert('after', 'save[-1]', [{
          _key:uuidv4(),
          userId: user.googleId,
          postedBy: {
            _type:'postedBy',
            _ref: user.googleId
          }
        }])
        .commit()
        .then(()=> {
          window.location.reload();
        })
    }
  }


  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >

        <img className="rounded-lg w-full" alt="user-post" src={urlFor(image).width(250).url()} />

        {/* Show some JSX if post was hovered */}
        {postHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pb-2 z-50'
            style={{height: '100%'}}
          >
            
            {/* The top of the item (Pin) */}
            <div
              className='flex items-center justify-between'
            >
              
              {/* ICON: download */}
              <div className='flex gap-2 '>
                <a 
                  href={`${image?.asset?.url}?dl=`} 
                  download 
                  onClick={(e) => e.stopPropagation()} //"stopPropagation()"For stop all events thats mean NOT go to /pin-detail/_id Not see the pit details
                  className="bg-orange-700 w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline/>
                </a>
              </div>

              {/* ICON: Checking if the user save*/}
              {alreadySaved? (   //Checking before with double !
                <button type='button' className='bg-orange-700 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-non'>                                       
                  {save?.length}  Saved     
                </button>
              ):(
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type='button' className='bg-orange-700 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-non'>
                  Save
                </button>
              )}    
            </div>

            <div className='flex justify-between items-center gap-2 w-full'>
              {location && (
                <a
                  href={location}
                  target="_blank"
                  rel='noreferrer'
                  className="bg-orange-700 flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill/>
                  {location.length > 20 ? location.slice(8,20) : location.slice (8) }
                </a>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  )
}

export default Pin