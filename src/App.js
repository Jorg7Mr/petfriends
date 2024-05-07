import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./cliente/components/navbar";
import Pet from "./cliente/app/pet/pets";
import Dates from "./cliente/app/date/dates";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Pet />} />
          <Route path="/mascotas" element={<Pet />} />
          <Route path="/agenda" element={<Dates />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

