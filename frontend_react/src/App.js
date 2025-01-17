import React from 'react';

import {About, Footer, Header, Skills, Work} from './container';
import {Navbar} from './components';
import './App.scss';
import Experience from './container/Experience/Experience';

const App = () => {
  return (
    <div className ="app">
      <Navbar />
        <Header />
        <Skills />
        <Work /> 
        <Experience /> 
        <About />
        {/* <Testimonial />  */}
      <Footer />
    </div>
  )
}

export default App;