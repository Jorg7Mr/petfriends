import React from "react";
import "../../styles/pet/petNotFound.css";

const PetNotFound = ({ message }) => {
  return (
    <div className="contentNotFound">
      <h3>{message}</h3>

      <div className="contentImageNotFound">
        <img
          className="imgPetNotFound"
          src="/image/petnotfound.png"
          alt="Pet Not Found"
        />
      </div>
    </div>
  );
};

export default PetNotFound;
