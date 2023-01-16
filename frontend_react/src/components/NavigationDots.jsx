import React from 'react'

/* Aqui se configura los puntos de navegacion que estanal lado derecho de cada seccion*/ 
const NavigationDots = ({active}) => {
  return (
    <div className='app__navigation'>
        {['home', 'about', 'work', 'skills', 'testimonials', 'contact'].map((item, index) => (
            <a
            href={`#${item}`}
            key={item + index}
            className='app__navigation-dot'
            style={active === item ? { backgroundColor: '#f29c06' } : { }}
            />        
        ))}
    </div>
  )
}

export default NavigationDots