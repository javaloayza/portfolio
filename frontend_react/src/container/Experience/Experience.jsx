import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { AppWrap, MotionWrap } from '../../wrapper';
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

  const formatDate = (date) => {
    if (date) {
      return new Date(date).toLocaleDateString('es-ES', {
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '/');
    }
    return '';
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
            <motion.div className="app__skills-exp-works">
              {experience.works.map((work) => (
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5 }}
                  className="app__skills-exp-work"
                  key={work.name}
                >
                  <h4 className="bold-text">{work.name}</h4>
                  <p className="p-text">{work.company}</p>
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