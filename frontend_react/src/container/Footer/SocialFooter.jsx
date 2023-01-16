import React from 'react'
import { BsInstagram } from 'react-icons/bs';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './SocialFooter.scss'


/** Aqui se configura los iconos para enlazar a las redes sociales para cada seccion
 * estos iconos son jalados desde react-icons como componentes
 */
const SocialFooter = () => {
  return (
    <div className='app__socialFooter'>
        <a href="https://www.linkedin.com/in/aldoloayza" target="_blank" rel="noreferrer" >
            <FaLinkedin />
        </a>
        <a href="https://github.com/Javadev7" target="_blank" rel="noreferrer">
            <FaGithub />
        </a>
        <a href="https://www.instagram.com/javierloayz" target="_blank" rel="noreferrer">
            <BsInstagram />
        </a>
    </div>
  )
}

export default SocialFooter