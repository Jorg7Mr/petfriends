import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./cliente/components/navbar";
import Pet from "./cliente/app/pet/pets";
import Dates from "./cliente/app/date/dates";
import Service from "./cliente/app/service/service";
import DateServices from "./cliente/app/dateService/dateServices";
import Login from "./cliente/app/auth/login";
import Register from "./cliente/app/auth/register";
import Home from "./cliente/app/home/home";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/mascotas" element={<Pet />} />
          <Route path="/datePet" element={<Dates />} />
          <Route path="/service" element={<Service />} />
          <Route path="/dateService" element={<DateServices />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
