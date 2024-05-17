import React from "react";
import "../../styles/date/dateOptionMenu.css";
const DateOptions = () => {
  const redirectDatePet = () => {
    window.location.href = "/datePet";
  };

  const redirectDateService = () => {
    window.location.href = "/dateService";
  };

  return (
    <div>
      <div className="optionsDateMenu">
        <div className="contentOptionDateService">
          <button className="btnOptionService" onClick={redirectDateService}>
            Servicio
          </button>
        </div>
        <hr className="hrDateOption" />
        <div className="contentOptionDatePet">
          <button className="btnOptionPet" onClick={redirectDatePet}>
            Citas
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateOptions;
