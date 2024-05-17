import React, { useEffect, useState } from "react";
import "../../styles/date/dates.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEye } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../components/modal";
import useDateService from "../../hooks/useDateService";
import FormatNumber from "../../common/formatNumber";
import { Tooltip } from "@material-tailwind/react";

const DateServices = () => {
  const [dates, setDates] = useState([]);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateId, setDateId] = useState(null);
  const [newState, setNewState] = useState(null);
  const [showModalEye, setShowModalEye] = useState(false);
  const { getAllDateServicesWithService, updateDateService, error, isLoading } =
    useDateService();
  useEffect(() => {
    getAllDateServicesWithService()
      .then((data) => {
        setDates(data);
      })
      .catch((error) => {
        console.error("Error fetching dates:", error);
      });
  }, []);

  const handleConfirmChange = async (dateId, newState) => {
    try {
      await updateDateService(dateId, newState);
      const updatedDates = await getAllDateServicesWithService();
      setDates(updatedDates);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating date state:", error);
      toast.error(
        "Ha ocurrido un error al momento de cambiar el estado de la cita"
      );
    }
  };

  const handleShowModal = (dateId, newState, date) => {
    setDateId(dateId);
    setNewState(newState);
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const filteredDates = dates?.filter((date) => {
    const formattedDate = new Date(date?.dateService.date);
    const isDateInRange =
      startDate && endDate
        ? formattedDate >= new Date(startDate) &&
          formattedDate <= new Date(endDate)
        : true;
    return (
      (date.dateService.person
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        date.dateService.pet
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      isDateInRange
    );
  });

  const handleHideModalEye = () => {
    setShowModalEye(false);
  };

  const showShowModalEye = (services) => {
    setServices(services);
    setShowModalEye(true);
  };
  return (
    <>
      <div className="contentDate">
        <Modal
          open={showModal}
          onHide={handleHideModal}
          onSave={() => handleConfirmChange(dateId, newState)}
          title="Confirmar actualización de cita"
        >
          <p>
            ¿Actualizar el estado de <strong>{selectedDate?.state}</strong> a{" "}
            <strong>{newState}</strong> para{" "}
            <strong>{selectedDate?.person}</strong>?
          </p>
        </Modal>
        <Modal
          open={showModalEye}
          onHide={handleHideModalEye}
          onSave={handleHideModalEye}
          title="Lista de Servicios"
        >
          <div>
            {services.map((service, index) => (
              <div key={index} className="serviceList">
                <p>
                  <strong className="txtServiceName">{service.name} </strong>
                </p>
                <p className="txtServicePrice">
                  $<FormatNumber number={service.price} />
                </p>
              </div>
            ))}
          </div>
        </Modal>
        <div>
          <p className="titleDate">Agenda de Servicios</p>
        </div>

        <div className="contentDataDates">
          <div className="contentPetFilters">
            <div>
              <span>De: </span>
              <input
                type="date"
                placeholder="Buscar Fecha"
                className="inputSearch"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <span>A: </span>
              <input
                type="date"
                placeholder="Buscar Fecha"
                className="inputSearch"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="searchContent">
              <input
                placeholder="Buscar Persona o Mascota"
                className="inputSearch"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="searchIcon">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>
          </div>
          <div className="contentTable">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Persona</th>
                  <th>Telefono</th>
                  <th>Mascota</th>
                  <th>Fecha</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Servicios</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {filteredDates && filteredDates.length > 0 ? (
                  filteredDates.map((date, index) => (
                    <tr key={index}>
                      <td>{date.dateService.person}</td>
                      <td>{date.dateService.telephone}</td>
                      <td>{date.dateService.pet}</td>
                      <td>
                        {new Date(date.dateService.date).toLocaleDateString()}
                      </td>
                      <td>{date.dateService.hourStart}</td>
                      <td>{date.dateService.hourEnd}</td>
                      <td>
                        <Tooltip
                          content="Ver Servicio"
                          className="tooltipStyle"
                        >
                          <button className="styleBtnEye customIconEye">
                            <FontAwesomeIcon
                              icon={faEye}
                              onClick={() => showShowModalEye(date.services)}
                            />
                          </button>
                        </Tooltip>
                      </td>
                      <td>{date.dateService.total}</td>
                      <td>
                        <select
                          value={date.dateService.state}
                          onChange={(e) =>
                            handleShowModal(
                              date.dateService._id,
                              e.target.value,
                              date.dateService
                            )
                          }
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="finalizado">Finalizado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr>
                      <td />
                      <td />
                      <td />
                      <td colSpan="8">
                        <h3> No se han encontrado citas</h3>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default DateServices;
