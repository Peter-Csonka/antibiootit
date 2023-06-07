import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { Routes, Route } from "react-router-dom";
import CookiePopup from './components/Cookies';
import React, { useState } from 'react';


function App() {

  const [showCookiePopup, setShowCookiePopup] = useState(true);

  const handleAcceptCookies = () => {
    setShowCookiePopup(false);
    // Tässä vaiheessa voit tallentaa käyttäjän hyväksynnän esimerkiksi
    // paikalliseen tilaan tai evästeisiin.
  };

  return (
    <>
      {showCookiePopup && <CookiePopup onAccept={handleAcceptCookies} />}
      <Header />
      <Routes>
				<Route path="/" element={<Main path = "/" />} />
				<Route path="/tietoa" element={<Main path = "/tietoa" />} />
				<Route path="/palaute" element={<Main path = "/palaute" />} />
        <Route path="*" element={<Main path = "not-found" /> } />
			</Routes>
      <Footer />
    </>
  );
}

export default App;
