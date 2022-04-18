import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from './Pin'

//options for breakpoints' how many pics is given to see for Phones / Computers 
const breakpointObj = {
    default: 4,
    //Pixels: how many pics  
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1
}

const MasonryLayout = ({ pins }) => (
    <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj}>

        {pins?.map((pin) => <Pin key={pin._id} pin={pin} className="w-max" />)}

    </Masonry>
)

export default MasonryLayout