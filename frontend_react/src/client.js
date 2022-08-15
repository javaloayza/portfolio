 import sanityClient from '@sanity/client';
 import imageUrlBuilder from '@sanity/image-url';


/* Creación de un cliente que se utilizará para conectarse a la API de Sanity. */
 export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-02-01',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_TOKEN,
 });

 /* Creación de un constructor que se utilizará para crear URL de imágenes. */
 const builder = imageUrlBuilder(client);
 

/**
 * It takes a source parameter, and returns a URL for that source
 * @param source - The image source. This can be either a public ID (e.g. "sample") or a full URL to an
 * external image (e.g. "http://cloudinary.com/images/logo.png").
 */
 export const urlFor = (source) => builder.image(source);