import React, { useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import { AppWrap, MotionWrap} from '../../wrapper';
import { urlFor, client} from '../../client';
//import { ClientError } from '@sanity/client';

import './Skills.scss'

const Skills = () => {
const [experience, setExperience] = useState([]);
const [skills, setSkills] = useState([]);



  /* A hook that is used for data fetching, component state, and for executing side effects. */
  useEffect(() => { 
    const query = '*[_type == "experiences"] | order(_createdAt asc)';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query)
     .then((data) => {

 
       setExperience(data);
     }) 
     
     client.fetch(skillsQuery)
     .then((data) => {
       setSkills(data);
     })

 } ,[])


  // Ordenar las experiencias por fecha de inicio de forma descendente
  const sortedExperiences = experience.sort((a, b) => {
    const dateA = a.years && a.years.length > 0 ? new Date(a.years[0].startDate) : null;
    const dateB = b.years && b.years.length > 0 ? new Date(b.years[0].startDate) : null;
    return dateB - dateA;
  });


  const formatDate = (date) => {
    if (date) {
      return new Date(date).toLocaleDateString('es-ES', {
        /* day: '2-digit', */
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '/');
    }
    return '';
  };

  return (
    <>
    <h2 className="head-text">Skills & <span>Experiences</span></h2>

    <div className="app__skills-container">
      <motion.div className="app__skills-list">
        {skills.map((skill) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className="app__skills-item app__flex"
            key={skill.name}
          >
            <div
              className="app__flex"
              style={{ backgroundColor: skill.bgColor }}
            >
              <img src={urlFor(skill.icon)} alt={skill.name} />
            </div>
            <p className="p-text2">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>
      <div className="app__skills-exp">
        {sortedExperiences.map((experience, index) => (
          <motion.div
            className="app__skills-exp-item"
            key={index}
          >
            <div className="app__skills-exp-year">
              <p className="bold-text" >
                
                {experience.years?.length > 0 && `${formatDate(experience.years[0].startDate)}  - ${(experience.years[0].endDate ? formatDate(experience.years[0].endDate): " Present" )}` }</p>
            </div>
            <motion.div className="app__skills-exp-works">
              {experience.works.map((work, index) => (
                <>
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    className="app__skills-exp-work"
                    data-tip
                    data-for={work.name}
                    key={work.name}
                  >
                    <h4 className="bold-text">{work.name}</h4>
                    <p className="p-text">{work.company}</p>
                  </motion.div>
                  <ReactTooltip
                    id={work.name}
                    effect="solid"
                    arrowColor="#fff"
                    className="skills-tooltip"
                  >
                    {work.desc}
                  </ReactTooltip>
                </>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </>
);
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
     'skills',
     "app__whitebg"
     );