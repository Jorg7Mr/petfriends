import React, { useState } from "react";
import "../../styles/pet/petList.css";

const PetList = ({ data, handleShowModalDate }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <div className={`contentPetList`} onClick={handleClick}>
        <div className="contentDataPet">
          <div className="dataPet">
            <div className="contentNameAndType">
              <p className="textName">{data?.name}</p>
              <p className="textType">{data?.type}</p>
            </div>
            <p className="textDescription">{data?.description}</p>
            <button
              className="btnAddCita"
              onClick={() => handleShowModalDate(data)}
            >
              Agendar PetCita
            </button>
          </div>
        </div>
        <div className="contentImagePet">
          <img src={data?.image} alt="imgPet" className="imgPet" />
        </div>
      </div>
    </>
  );
};

export default PetList;
