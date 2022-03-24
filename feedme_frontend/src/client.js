import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient ({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,   //Taken from Sanity manager 
    dataset:'production',
    apiVersion:'2022-03-23',
    useCdn:true,
    token: process.env.REACT_APP_SANITY_TOKEN,          //Added and Taken from Sanity manger
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
