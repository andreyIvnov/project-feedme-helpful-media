import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom' ;

import { client } from '../client';
import { searchQuery } from '../utils/data';
import  MasonryLayout from './MasonryLayout';  //For the specific rendering Css (Like in Google Image searching)
import Spinner  from './Spinner'   // For the loading 

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null)
  const { categoryId } = useParams();

  //Spinner effect every  time we change a category by Take the URL
  useEffect(() => {
    setLoading(true);
    
    if(categoryId){
      const query = searchQuery(categoryId)  

      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false)
        })
    }else{

    }

  }, [categoryId])
  

  if(loading) return <Spinner message="We are adding new ideas to your feed!"/> //Gone be dynamic 

  return (
    <div>
      Feed
    </div>
  )
}

export default Feed