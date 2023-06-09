import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import CookieConsent from "./components/CookieConsent";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [isVisible, setIsVisible] = useState(!localStorage.getItem('cookieAccepted'));
    
    const handleAccept = () => {
        localStorage.setItem('cookieAccepted', 'true');
        setIsVisible(false);
        console.log("Keksit hyväksytty");
    };
    // this is so that the banner stays visible and is easier to style
    // HAS to be removed when the styling is done to actually save to localStorage
    // so the banner doesnt pop up anymore after either clicking 'sulje' button
    // or the 'Lisätietoa' reference.
    localStorage.removeItem('cookieAccepted');

  return (
    <>
      <Header />
      <Routes>
				<Route path="/" element={<Main path = "/" />} />
				<Route path="/tietoa" element={<Main path = "/tietoa" />} />
				<Route path="/palaute" element={<Main path = "/palaute" />} />
        <Route path="*" element={<Main path = "not-found" /> } />
			</Routes>
      {isVisible && <CookieConsent onAccept={handleAccept}/>}
      <Footer />
    </>
  );
}

export default App;
