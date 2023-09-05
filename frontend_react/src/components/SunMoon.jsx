import React, { useState, useEffect } from "react";
import SunIcon from "../assets/sun-2.svg";
import MoonIcon from "../assets/moon-stars.svg";

const SunMoon = () => {
  const [isMoonVisible, setMoonVisible] = useState(true);

  // Al montar el componente, verifica la preferencia del usuario
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setMoonVisible(false);
      document.body.classList.add('dark-theme');
    }
  }, []);

  const toggleSunMoon = () => {
    setMoonVisible(!isMoonVisible);
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.removeItem('theme');
    }
  };

  return (
    <div onClick={toggleSunMoon} style={{ cursor: "pointer" }}>
      {isMoonVisible ? (
        <img src={MoonIcon} className="moon" alt="Moon Icon" />
      ) : (
        <img src={SunIcon} className="sun" alt="Sun Icon" />
      )}
    </div>
  );
};

export default SunMoon;