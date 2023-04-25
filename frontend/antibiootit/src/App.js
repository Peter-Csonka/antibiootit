import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
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
