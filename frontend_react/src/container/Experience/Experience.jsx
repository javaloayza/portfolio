import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { AppWrap, MotionWrap } from '../../wrapper';
import { ReactComponent as Open } from "../../assets/open.svg";
import { client } from '../../client';

import './Experience.scss';

Modal.setAppElement('#root'); // Esto es importante para la accesibilidad

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    const query = '*[_type == "experiences"] | order(_createdAt asc)';

    client.fetch(query)
      .then((data) => {
        setExperience(data);
      });

  }, []);

  // Ordenar las experiencias por fecha de inicio de forma descendente
  const sortedExperiences = experience.sort((a, b) => {
    const dateA = a.years && a.years.length > 0 ? new Date(a.years[0].startDate) : null;
    const dateB = b.years && b.years.length > 0 ? new Date(b.years[0].startDate) : null;
    return dateB - dateA;
  });

  const formatDate = (dateString) => {
    if (dateString) { // Verifica si dateString existe (no es null, undefined, o vacío)
      const dateObject = new Date(dateString); // Crea un objeto Date a partir del string
  
      if (isNaN(dateObject)) { // Comprueba si la fecha creada es inválida (NaN)
        console.error("Fecha inválida:", dateString); // Imprime un error si la fecha no es válida
        return ''; // Devuelve una cadena vacía si la fecha no es válida
      }
  
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes (0-11), le suma 1 y formatea a dos dígitos
      const year = dateObject.getFullYear(); // Obtiene el año
  
      return `${month}/${year}`; // Devuelve la fecha formateada como MM/AAAA
    }
    return ''; // Devuelve una cadena vacía si dateString no existe
  };

  const handleWorkClick = (work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWork(null);
  };

  return (
    <>
      <h2 className="head-text">
        My most relevant <span>Experiences</span>
      </h2>

      <div className="app__skills-exp">
        {sortedExperiences.map((experience, index) => (
          <motion.div
            className="app__skills-exp-item"
            key={index}
            onClick={() => handleWorkClick(experience.works[0])}
          >
            {/* {isMobile ? (
                <>
                  <div className="app__skills-exp-year" onClick={() => handleWorkClick(experience.works[0])}>
                    <p className="bold-text">
                      {experience.years?.length > 0 && `${formatDate(experience.years[0].startDate)} - ${(experience.years[0].endDate ? formatDate(experience.years[0].endDate) : "Present")}`}
                    </p>
                  </div>
                  <motion.div className="app__skills-exp-works">
                    {experience.works.map((work) => (
                      <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                        className="app__skills-exp-work"
                        onClick={() => handleWorkClick(work)}
                        key={work.name}
                      >
                        <h4 className="bold-text">{work.name}</h4>
                        <p className="p-text">{work.company}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              ) :  */}

            {/* <div
                  className="app__skills-exp-tooltip-wrapper"
                  data-tip
                  data-for={`experience-${index}`}
                > */}

            <div className="app__skills-exp-year">
              <p className="bold-text">
                {experience.years?.length > 0 &&
                  `${formatDate(experience.years[0].startDate)} - ${
                    experience.years[0].endDate
                      ? formatDate(experience.years[0].endDate)
                      : "Present"
                  }`}
              </p>
            </div>
            <motion.div className="app__skills-exp-experiences">
              {experience.works.map((work) => (
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5 }}
                  className="app__skills-experiences"
                  key={work.name}
                >
                  <h4 className="bold-text">{work.name}</h4>
                  <p className="p-text">{work.company}</p>
                  <button type="button" className="p-text button_details" onClick={() => handleWorkClick(experience.works[0])} >
                  <div className='open_style'><Open /></div>  
                    View more
                  </button>
              </motion.div>
              ))}
            </motion.div>
            <ReactTooltip
              id={`experience-${index}`}
              effect="solid"
              arrowColor="var(--primary-color)"
              className="skills-tooltip"
            >
              {experience.works.map((work) => (
                <div key={work.name}>
                  <h4 className="bold-text">{work.name}</h4>
                  <p className="p-text">{work.company}</p> <br />
                  <p className='p-modal'>{work.desc}</p> 
                </div>
              ))}
            </ReactTooltip>
            {/* </div> */}
          </motion.div>
        ))}
      </div>

      {selectedWork && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Work Details"
          className="modal"
          overlayClassName="overlay"
        >
          <button className="close-button" onClick={closeModal}>
            ×
          </button>
          <h2 className="title-modal">{selectedWork.name}</h2>
          <p className="p-modal">{selectedWork.company}</p> <br />
          {/* <p className='p-modal'>{selectedWork.desc}</p> */}
          {selectedWork.desc &&
            selectedWork.desc.map((paragraph, index) => (
              <p key={index} className="p-modal">
                {paragraph}
              </p>
            ))}
        </Modal>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Experience, 'app__skills'),
  'experience',
  "app__whitebg"
);