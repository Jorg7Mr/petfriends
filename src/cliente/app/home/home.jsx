import React from "react";
import "../../styles/home/home.css";

const Home = () => {
  const redirectPet = () => {
    window.location.href = "/mascotas";
  };

  return (
    <div className="home-container">
      <div className="background-image"></div>
      <div className="welcome-section">
        <h1>Bienvenidos a Pet Friends</h1>
        <p>Navega por nuestros servicios, adopta y agranda tu familia.</p>
        <button className="btnPet" onClick={redirectPet}>
          Mascotas
        </button>
      </div>
    </div>
  );
};

export default Home;
