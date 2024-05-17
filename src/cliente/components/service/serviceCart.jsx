import React, { useState, useEffect } from "react";
import "../../styles/service/serviceCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@material-tailwind/react";
import FormatNumber from "../../common/formatNumber";
import Modal from "../modal";
import useDateService from "../../hooks/useDateService";
import IsDateTimeValid from "../../common/isValidDate";
import { ToastContainer, toast } from "react-toastify";
import IsHourValid from "../../common/isValidHours";

const ServiceCart = ({ allService, setAllService }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModalDate, setShowModalDate] = useState(false);
  const [person, setPerson] = useState("");
  const [telephone, setTelephone] = useState("");
  const [petName, setPetName] = useState("");
  const [date, setDate] = useState(null);
  const [hourStart, setHourStart] = useState("");
  const [hourEnd, setHourEnd] = useState("");
  const { createNewDateService, isLoading, error } = useDateService();

  useEffect(() => {
    calculateTotalPrice();
  }, [allService]);

  const calculateTotalPrice = () => {
    let total = 0;
    allService.forEach((item) => {
      total += parseFloat(item.price);
    });
    setTotalPrice(total);
  };

  const handleRemoveFromCartClick = (data) => {
    setAllService((prevCart) =>
      prevCart.filter((item) => item._id !== data._id)
    );
  };

  const showShowModalDate = () => {
    rebootData();
    setShowModalDate(true);
  };

  const handleHideModalDate = () => {
    setShowModalDate(false);
    rebootData();
  };
  const rebootData = () => {
    setPerson("");
    setTelephone("");
    setPetName("");
    setDate("");
    setHourStart("");
    setHourEnd("");
  };
  const saveServiceDate = () => {
    if (!person || !telephone || !petName || !date || !hourStart || !hourEnd) {
      toast.error("Por favor, completa todos los campos");
      return;
    }
    if (!IsDateTimeValid(date, hourStart)) {
      toast.error("No se puede agendar citas en el pasado");
      return;
    }

    if (!IsHourValid(hourStart, hourEnd)) {
      toast.error(
        "La hora de inicio no puede ser mayor a la hora de finalizacion"
      );
      return;
    }

    let personSize = person.length;
    if (personSize < 5 || personSize > 20) {
      toast.error(
        `El nombre de la persona no puede ser menor a 5 caracteres ni mayor a 20 caracteres, longitud actual:
        ${personSize}`
      );
      return;
    }

    let petSize = petName.length;
    if (petSize < 5 || petSize > 20) {
      toast.error(
        `El nombre de la mascota no puede ser menor a 5 caracteres ni mayor a 20 caracteres, longitud actual: ${petSize}`
      );
      return;
    }

    let telSize = telephone.length;
    if (telSize > 15) {
      toast.error(
        `El numero telefonico no puede ser mayor a 15 caracteres, longitud actual: 
        ${telSize}`
      );
      return;
    }
    const serviceListIds = allService.map((service) => service._id);
    const serviceData = {
      serviceList: serviceListIds,
      total: totalPrice,
      person: person,
      telephone: telephone,
      pet: petName,
      date: date,
      hourStart: hourStart,
      hourEnd: hourEnd,
    };
    createNewDateService(serviceData)
      .then(() => {
        toast.success("Cita agendado con éxito");
        setShowModalDate(false);
        rebootData();
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al crear la cita:", error);
        toast.error("Error al crear la cita");
      });
  };

  return (
    <div className="contentServiceCart">
      <Modal
        open={showModalDate}
        onHide={handleHideModalDate}
        onSave={saveServiceDate}
        title="Registrar PetServicio"
      >
        <div className="modalContent">
          <div className="formPetDate">
            <div>
              <p className="txtDateService txtDate">Servicios:</p>
              {allService?.map((service, index) => (
                <div key={index} className="txtDateServiceNamePrice">
                  {service.name}: ${<FormatNumber number={service.price} />}
                </div>
              ))}
            </div>
            <div>
              <p className="txtDatePriceTotal txtDate">Total</p>
              <input
                type="text"
                value={`$ ${totalPrice}`}
                readOnly
                className="txtDatePriceTotalForm txtDateForm"
              />
            </div>

            <div>
              <p className="txtDatePerson txtDate">Persona</p>
              <input
                type="text"
                value={person}
                onChange={(e) => setPerson(e.target.value)}
                className="txtDatePersonForm txtDateForm"
              />
            </div>
            <div>
              <p className="txtDateTelephone txtDate">Telefono</p>
              <input
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="txtDateTelephoneForm txtDateForm"
              />
            </div>
            <div>
              <p className="txtDatePet txtDate">Mascota</p>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="txtDatePetForm txtDateForm"
              />
            </div>
            <div className="contentDatesAndHours">
              <div className="contentDateDates">
                <p className="txtDateDates txtDate">Fecha</p>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="txtDateDatesForm txtDateForm"
                />
              </div>
              <div className="contentDateHour">
                <div>
                  <p className="txtDateHourStart txtDate">Inicia</p>
                  <input
                    type="time"
                    value={hourStart}
                    onChange={(e) => setHourStart(e.target.value)}
                    className="txtHourStartForm txtDateForm"
                  />
                </div>
                <div>
                  <p className="txtDateHourEnd txtDate">Finaliza</p>
                  <input
                    type="time"
                    value={hourEnd}
                    onChange={(e) => setHourEnd(e.target.value)}
                    className="txtHourEndForm txtDateForm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div>
        <p className="titleCart">Carrito de Servicios</p>
        <div>
          {allService?.map((item, index) => (
            <div className="contentServiceItem" key={index}>
              <div className="contentItem">
                <div className="txtDataItem">
                  <Tooltip content={item.name} className="tooltipStyle">
                    {item.name.length > 8
                      ? `${item.name.substring(0, 8)}...`
                      : item.name}
                  </Tooltip>
                </div>
                <div className="txtDataItem">
                  <FormatNumber number={item.price} />
                </div>
              </div>
              <div className="contentBtnRemove">
                <Tooltip content="Eliminar servicio" className="tooltipStyle">
                  <button
                    className="btnTrash"
                    onClick={() => handleRemoveFromCartClick(item)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="iconTrash" />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="hrStyle" />
      <div className="containerTotal">
        <p className="txtTotal">Total: </p>
        <p className="txtTotalPrice">
          <FormatNumber number={totalPrice} />{" "}
        </p>
      </div>
      {totalPrice !== 0 && (
        <div className="containerBtnPetTurno">
          <button className="btnPetTurno" onClick={showShowModalDate}>
            Agendar PetTurno
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ServiceCart;
