import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import CookieConsent from "./components/CookieConsent";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [isVisible, setIsVisible] = useState(!localStorage.getItem('cookieAccepted'));
  const [isPenicillinInfoVisible, setIsPenicillinInfoVisible] = useState(false);
    
    const handleAccept = () => {
        localStorage.setItem('cookieAccepted', 'true');
        setIsVisible(false);
    };

    const handlePenicillinInfoVisibility = (isVisible) => {
      setIsPenicillinInfoVisible(isVisible);
    }

  return (
    <>
      <Header />
      <Routes>
				<Route path="/" element={<Main path = "/" handlePenicillinInfoVisibility={handlePenicillinInfoVisibility} />} />
        <Route path="/penisilliiniallergia" element={<Main path = "/penisilliiniallergia" />} />
				<Route path="/tietoa" element={<Main path = "/tietoa" />} />
				<Route path="/palaute" element={<Main path = "/palaute" />} />
        <Route path="*" element={<Main path = "not-found" /> } />
			</Routes>
      {isVisible && <CookieConsent onAccept={handleAccept}/>}
      <Footer />
      {isPenicillinInfoVisible && <div className='penicillin-info-spacer'/>}
    </>
  );
}

export default App;
