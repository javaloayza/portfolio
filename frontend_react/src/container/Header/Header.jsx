import React from 'react'
import { motion } from 'framer-motion';

import { AppWrap } from '../../wrapper';
import{ images } from '../../constants';

import  './Header.scss';

/* A constant that is being used to animate the circles. */
const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
}

const Header = () => {
  return (
    <div className='app__header app__flex'>
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0,1]}}
        transition= {{ duration: 0.5}}
        className= 'app__header-info'
      >
        <div className='app__header-badge'>
          <div className='badge-cmp app__flex'>
            <span className="waveEmoji">👋</span>
            <div style={{ marginLeft: 20}}>
              <p className='p-text'>Hello, I am</p>
              <h1 className='head-text'>Aldo</h1>
              <p className='p-text'>Full Stack Developer</p>
            </div>
          </div>

       {/*    <div className='tag-cmp app__flex'>
            <p className='p-text'>Web Developer</p>
            <p className='p-text'> Full Stack</p>
          </div> */}
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0,1] }}
        transition= {{ duration: 0.5, delayChildren: 0.5 }}
        className='app__header-img'
      >
        <img src={images.profile_} alt='profile_bg'/> 

        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition= {{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt='profile_circle'
          className='overlay_circle'
        />
        </motion.div>

        <motion.div
          variant={scaleVariants}
          whileInView={ scaleVariants.whileInView }
          className='app__header-circles'
          /* Abajo se mapea cada imagen de forma destructurada, ingresan como parametro y se le asigna un index en automatico
          que tambien ingresa, finalmente se renderiza cada imagen con las clases de estilo correspondiente*/>
          {[images.react, images.node, images.typescript].map((circle, index)=>(
            <div className='circle-cmp app__flex' key={`circle-${index}`}>
              <img src={circle} alt='circle' /> 
            </div>
          ))}
        </motion.div>
    </div>
  )
}

export default AppWrap(Header, 'home');