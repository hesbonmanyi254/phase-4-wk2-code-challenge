import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import Navbar from "./Navbar";
import Restaurant from "./Restaurant";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/restaurants/:id" element={<Restaurant />} />
        <Route path="/" element={<Home />} />
        
      </Routes>
    </Router>
  );
}

export default App;
