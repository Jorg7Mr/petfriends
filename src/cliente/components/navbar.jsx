import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPaw,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
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
          <div className="navOption">
            <Link to="/agenda" className="iconContainer">
              <FontAwesomeIcon icon={faCalendarAlt} className="custom-icon" />
              <span className="optionText">Agenda</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
