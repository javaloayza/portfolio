import React, { useState} from 'react'
import { HiMenuAlt4, HiX} from 'react-icons/hi';
import {motion} from 'framer-motion';
// import { images } from '../../constants';


import './Navbar.scss';
import SunMoon from '../SunMoon';


const Navbar = () => {
  const [toggle, setToggle] = useState(false); 
  // const { theme, toggleTheme, themeName } = useTheme();


  return (
    <nav className='app__navbar'>
      {/* <div className='app__navbar-logo'>
        <img src={images.logo} alt="logo" /> 
      </div> */}
      <ul className='app__navbar-links'>
        {['home', 'skills', 'work', 'experience', 'contact'].map((item)=> (
          <li className='app__flex p-text' key={`link-${item}`}>
              <div /> 
              <a href={`#${item}`}>{item}</a>
          </li>
          ))}
      </ul>

      
      <SunMoon/>
      <div className='app__navbar-menu'>
          <HiMenuAlt4 onClick={() => setToggle(true)}/>
          {toggle && (
            <motion.div
            whileInView={{ x: [170, 0]}}
              transition={{ duration: 0.85, ease: 'easeOut'}}
              >
              <HiX onClick={() => setToggle(false)} />
              <ul>
              {['home', 'skills', 'work', 'experience', 'contact'].map((item)=> (
                  <li key={item}>
                    <a href={`#${item}`} onClick={() => setToggle(false)}>{item}</a>
                  </li>
            ))}   
              </ul>
            </motion.div>
          )}
      </div>      
    </nav>
  )
}

export default Navbar