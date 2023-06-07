import React, { useState } from 'react';

/*const consentGranted = () => {
  // Suorita toiminnot, kun suostumus on annettu
  gtag('consent', 'update', {
    'ad_storage': 'granted'
  });
}; */

const CookiePopup = () => {

  const [showPopup, setShowPopup] = useState(true);

  const consentGranted = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null; // Palautetaan tyhjä (null), jos popupia ei näytetä
  }

  return (
    <div className="cookie-popup">
      <p>Tämä sivusto käyttää evästeitä parantaakseen käyttökokemustasi.</p>
      <button onClick={consentGranted}>Hyväksy</button>
    </div>
  );
}

export default CookiePopup;
