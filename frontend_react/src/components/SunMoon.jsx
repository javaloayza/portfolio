import React, { useState, useEffect } from "react";
import { ReactComponent as SunIcon } from "../assets/sun-2.svg";
import { ReactComponent as MoonIcon } from "../assets/moon-stars.svg";

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
              <div className="moon">
                  <MoonIcon />
              </div>
          ) : (
              <div className="sun">
                  <SunIcon />
              </div>
          )}
      </div>
  );
};

export default SunMoon;