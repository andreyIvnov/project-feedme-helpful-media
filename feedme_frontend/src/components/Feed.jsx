import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom' ;

import { client } from '../client';
import  MasonryLayout from './MasonryLayout';  //For the specific rendering Css (Like in Google Image searching)
import Spinner  from './Spinner'   // For the loading 

const Feed = () => {
  const [loading, setLoading] = useState(true);

  if(loading) return <Spinner message="We are adding new ideas on your feed!"/> //Gone be dynamic 

  return (
    <div>
      Feed
    </div>
  )
}

export default Feed