/**
 * This function takes in a component, an idName, and classNames, and returns a function that returns a
 * div with the idName, classNames, and the component passed in.
 * @param Component - The component that will be wrapped
 * @param idName - the id of the component
 * @param classNames - This is a string of classes that will be added to the app__container div.
 * @returns A function that returns a div with the component passed in as a parameter.
 */
import React from 'react'
import { NavigationDots, SocialMedia } from '../components';

/**Aqui configuramos el AppWrap para que envuelva a los componentes de seccion de la web
 * de esta manera le aplicamos a cada seccion los componentes NavigationDots (puntos de navegacion) 
 * y SocialMedia(iconos de redes sociales). Este componente envolvera cada seccion y lo reutilizaremos
 * en cada seccion para aprovechar su funcionalidad.
 */
const AppWrap = (Component, idName, classNames) => function HOC() {
  return (
    <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />

        <div className='app__wrapper app__flex'>
            <Component />

            <div className='copyright'>
                <p className='p-text'>@2022 Aldo Loayza</p>
                <p className='p-text'>All right reserved</p>
            </div>
        </div>
        <NavigationDots active={idName} />
    </div>
  )
}

export default AppWrap