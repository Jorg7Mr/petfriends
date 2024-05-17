import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPaw,
  faCalendarAlt,
  faScissors,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import DateOptions from "./date/dateOptionMenu";

const Navbar = () => {
  const [subMenuDate, setSubMenuDate] = useState(false);
  const hideSubMenuDate = () => {
    setSubMenuDate(false);
  };
  const showShowSubMenuDate = () => {
    setSubMenuDate(true);
  };
  return (
    <div>
      <FontAwesomeIcon icon="fa-solid fa-dog" />

      <div className="nav">
        <Link to="/">
          <div className="contentImageLogo">
            <img src="image/logo.png" alt="logo" className="imgLogo" />
          </div>
        </Link>
        <div className="navOptionsContent">
          <div className="navOption">
            <Link to="/" className="iconContainer">
              <FontAwesomeIcon icon={faHome} className="custom-icon" />
              <span className="optionText">Inicio</span>
            </Link>
          </div>
          <div className="navOption">
            <Link to="/mascotas" className="iconContainer">
              <FontAwesomeIcon icon={faPaw} className="custom-icon" />
              <span className="optionText">Mascotas</span>
            </Link>
          </div>
          <div className="navOption navOptionDate">
            <Link
              className="iconContainer"
              onClick={subMenuDate ? hideSubMenuDate : showShowSubMenuDate}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="custom-icon" />
              <span className="optionText">Agenda</span>
            </Link>
            {subMenuDate && <DateOptions className="contentOptionMenuDate" />}
          </div>
          <div className="navOption">
            <Link to="/service" className="iconContainer">
              <FontAwesomeIcon icon={faScissors} className="custom-icon" />
              <span className="optionText">Servicios</span>
            </Link>
          </div>
          <div className="navOption">
            <Link to="/login" className="iconContainer">
              <FontAwesomeIcon icon={faUser} className="custom-icon" />
              <span className="optionText">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
