export const userQuery = (userId) => {
      const query = `*[_type == "user" && _id == '${userId}']`;

      return query;
}

//for get a specific category 
export const searchQuery = (searchTerm) => {
      const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
            image{
                  asset->{
                        url
                  }
            },
            _id,
            destination,
            postedBy->{
                  _id,
                  userName,
                  image
            },
            location,
            save[]{
                  _key,
                  postedBy->{
                        _id,
                        userName,
                        image
                  },
            },
      }`;

      return query;
}
// Try to get a document of type = "user" and the id is equal to userId 

//for get the all posts we get to query 
export const feedQuery = `*[_type -- 'pin'] | order(_createAt desc){
      image{
            asset->{
                  url
            }
      },
      _id,
      destination,
      postedBy->{
            _id,
            userName,
            image
      },
      location,
      save[]{
            _key,
            postedBy->{
                  _id,
                  userName,
                  image
            },
      },
}`

