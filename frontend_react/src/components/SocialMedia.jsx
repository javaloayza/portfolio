import React from 'react'
import {BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

/** Aqui se configura los iconos para enlazar a las redes sociales para cada seccion
 * estos iconos son jalados desde react-icons como componentes
 */
const SocialMedia = () => {
  return (
    <div className='app__social'>
        <div>
            <BsTwitter />
        </div>
        <div>
            <FaFacebookF />
        </div>
        <div>
            <BsInstagram />
        </div>
    </div>
  )
}

export default SocialMedia