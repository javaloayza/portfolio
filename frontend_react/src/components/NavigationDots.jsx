import React from 'react'

/* Aqui se configura los puntos de navegacion que estanal lado derecho de cada seccion*/ 
const NavigationDots = ({active}) => {
  return (
    <div className='app__navigation'>
        {['home', 'skills', 'work', 'experience', 'about', 'contact'].map((item, index) => (
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a
            href={`#${item}`}
            key={item + index}
            className='app__navigation-dot'
            style={active === item ? { backgroundColor: 'var(--secondary-color)' } : { }}
            />        
        ))}
    </div>
  )
}

export default NavigationDots