import React, { useState, useEffect} from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import {motion} from 'framer-motion';

import { AppWrap, MotionWrap} from '../../wrapper';
import { urlFor, client} from '../../client';
import './Work.scss';
import { ClientError } from '@sanity/client';

const Work = () => {

/* Este es un enlace que se utiliza para establecer el estado del componente. */
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1})
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

/* Este es un enlace que se utiliza para obtener datos de la API de Sanity. */
  useEffect(() => { 
     const query = '*[_type == "works"]';

     client.fetch(query)
      .then((data) => {
        setWorks(data);
        setFilterWork(data);
      })

  } ,[])


 /*Esta funcion configura los botones que estan en la parte superior de la seccion Work, esto sera llamado una vez 
 se haga click en la parte de abajo cuando se llame en el return, configura los estados y evalua segun
 la condicion para monstrar los proyectos filtrados segun el tag de sanity y el nombre del work elemento*/ 
  const handleWorkFilter = (item) => {
   /* Configuración del filtro activo y la animación de la tarjeta. */
    setActiveFilter(item);
    setAnimateCard([{ y:100, opacity: 0}]);

 /* Configuración de la animación en la tarjeta. */
    setTimeout(() => {
      setAnimateCard([{y:0, opacity: 1 }]);

     /* Esta es una declaración condicional que verifica si el elemento es igual a 'All' y, si lo es,
     establece el estado setFilterWork en el estado de works. Si no es igual a 'All',
     establece el estado de setFilterWork en el estado de setFilterWork por el elemento.
     </código> */
      if(item === 'All') {
        setFilterWork(works);
      }else{
        setFilterWork(works.filter((work) => work.tags.includes(item)))
      }
    }, 500);
  }

  return (
    /* Aqui se configura la los motion div que van a contener las imagenes de los works,
    asi como los botones internos de vision y github a los cuales se accede de react-icons,
    en un principio se declaran los botones con los tipos de trabajos de la parte superior de la seccion
    y se le pasa la el evento onClick que va a contener handleWorkFilter que aplicara su funcion segun
    el item que se le pase.
     */
    <>
      <h2 className="head-text"> My Creative <span>Portafolio</span> section </h2>
      
      <div className="app__work-filter">
        {['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map((item, index) => (
          <div
          key={index}
          onClick={() => handleWorkFilter(item) }
          className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
       </div>
         
          <motion.div
            animate={animateCard}
            transition= {{transition: 0.5, delayChildren: 0.5 }}
            className='app__work-portfolio'
           >
            {filterWork.map((work, index) => (
              <div className='app__work-item app__flex' key={index}>
                <div className='app__work-img app__flex'>
                  <img src={urlFor(work.imgUrl)} alt={work.name} /*este urlFor jala mediante una Url la imagen 
                  y work.name jala el name de Sanity *//>

                  <motion.div
                    whileHover={{opacity: [0, 1]}}
                    transition={{ duration: 0.25, ease: 'easeInOut',  delayChildren: 0.5 }}
                    className='app__work-hover app__flex'
                    >
                    <a href={work.projectLink} target='_blank' rel='noreferrer' >
                        <motion.div
                          /* Un gancho de movimiento de marco que se usa para animar el elemento cuando
                          está a la vista. Se aplican los efectos*/
                          whileInView={{scale: [0, 1]}} 
                          whileHover={{scale: [1, 0.9]}}
                          transition={{ duration: 0.25}}
                          className='app__flex'
                        >
                          <AiFillEye /*aqui se jala el component icono de react-icons*//>
                        </motion.div>
                    </a>
                    <a href={work.codeLink} target='_blank' rel='noreferrer' >
                        <motion.div
                          whileInView={{scale: [0, 1]}} 
                          whileHover={{scale: [1, 0.9]}}
                          transition={{ duration: 0.25}}
                          className='app__flex'
                        >
                          <AiFillGithub />
                        </motion.div>
                    </a>
                  </motion.div>
                </div>
                
                <div className='app__work-content app__flex' /*
                  Aqui se estan aplicando los estilos al texto de la parte de abajo de la imagen del work*/>
                  <h4 className='bold-text'/* Se jala el titulo de Sanity*/>{work.title}</h4 >
                  <p className='p-text' style={{ marginTop: 10 }}/*Se jala la descripcion de Sanity*/>{work.description}</p>
                
                    <div className='app__work-tag app__flex'>
                      <p className='p-text'/*Se jala el tag index '0' de Sanity*/>{work.tags[0]}</p>

                    </div>
                </div>

              </div>
            ))}
          </motion.div>  
    </>
  )
}

export default AppWrap(
  MotionWrap(Work, 'app__works'),
     'work',
     'app__primarybg'
     );