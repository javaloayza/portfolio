import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';

import './Skills.scss';

Modal.setAppElement('#root'); // Esto es importante para la accesibilidad

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(skillsQuery)
      .then((data) => {
        setSkills(data);
      });
  }, []);

  const filteredFrontendSkills = skills.filter((skill) => skill.category === 'frontend').sort((a, b) => a.order - b.order); 
  const filteredBackendSkills = skills.filter((skill) => skill.category === 'backend').sort((a, b) => a.order - b.order); 
  const filteredToolsSkills = skills.filter((skill) => skill.category === 'tools').sort((a, b) => a.order - b.order); 

  return (
    <>
      <h2 className="head-text"> My <span>Skills</span></h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
        <h2 className='title-skill'>Frontend Skills</h2>
          {filteredFrontendSkills.map((skill) => (
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
        <motion.div className="app__skills-list">
        <h2 className='title-skill'>Backend Skills</h2>
          {filteredBackendSkills.map((skill) => (
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
      <motion.div className="app__skills-list grid-column-skill">
        <h2 className='title-skill'>Tools</h2>
          {filteredToolsSkills.map((skill) => (
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
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
    'skills',
    "app__whitebg"
    );