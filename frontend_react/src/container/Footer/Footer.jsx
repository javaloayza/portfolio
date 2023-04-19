import React, { useState } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';
import SocialFooter from './SocialFooter';

const Footer = () => {

  /* A React Hook. It is used to store the form data. */
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Destructuring the formData object. */
  const { username, email, message } = formData;

/**
 * The handleChangeInput function is used to update the formData state object.
 */
  const handleChangeInput = (e) => {
    /* Destructuring the event object. */
    const { name, value } = e.target;
    /* A spread operator. It is used to copy all of the properties of one object into another. */
    setFormData({ ...formData, [name]: value });
  };

/* A function that is called when the user clicks the submit button. It sets the loading state to true
and then creates a contact object. */
  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

 /* Creating a new contact object and then setting the loading state to false and the isFormSubmitted
 state to true. Esto crear el contacto y lo guarda en Sanity*/
    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards" /*Aqui se configuran las imagenes del correo y numero de telefono */ >
        <div className="app__footer-card ">
          <img src={images.email_} alt="email" />
          <a href="mailto:jloayzag7@gmail.com" className="p-text">jloayzag7@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:(+51) 956157575" className="p-text"> (+51) 956157575</a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex" /*Se establece el formulario si isFormSubmitted es falso
        Los imputs nombre y email se configuran asingandole a cada uno el valor destructurado y se le da el evento handleChangeInput 
        de otra manera se envia el texto 'Thank you for getting in touch!' */>
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your Name..." name="username" value={username} onChange={handleChangeInput} />
          </div>
          <div className="app__flex">
            <input className="p-text" type="email" placeholder="Your Email..." name="email" value={email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea /*Aqui se establece el texarea, se le asigna el value desestructurado message y se le asigna handleChangeInput */
              className="p-text"
              placeholder="Your Message..."
              value={message}
              name="message"
              onChange={handleChangeInput}
              style={{ resize: 'none' }}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit} /* Aqui se configura el boton que ejecuta con un click
          la funcion handleSubmit , el estado loading ingresa como parametro, si es falso retorna 
          'Send Message' caso contrario retorna 'Sending...'  */>{!loading ? 'Send Message' : 'Sending...'}</button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
        </div>
      )}

      <SocialFooter/>

    </>
  );
};
/*Se envielve con AppWrap para aplicar a toda la seccion los iconos de redes sociales y los puntos de navegacion, recibe como parametros
el componente (MotionWrap) y la etiqueta para enlazar al punto de navegacion (idName 'contact') y className 'app__whitebg', cambia color fondo, 
MotionWrap se utiliza para aplicar una clase de estilo y envolver a Footer y aplica la clase */
export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);