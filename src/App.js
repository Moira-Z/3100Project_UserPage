import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/home";

function App() {
  return (
      <Router>
            <Routes>
            <Route path="/main/*" element={<Home />} />
            </Routes>
      </Router>
  );
}

export default App;
