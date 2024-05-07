import React, { useEffect, useState } from "react";
import "../../styles/date/dates.css";
import useDate from "../../hooks/useDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../components/modal";

const Dates = () => {
  const [dates, setDates] = useState([]);
  const { getAllDatesWithPets, updateDate, deleteDate, error, isLoading } =
    useDate();
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateId, setDateId] = useState(null);
  const [newState, setNewState] = useState(null);

  useEffect(() => {
    getAllDatesWithPets()
      .then((data) => {
        setDates(data);
      })
      .catch((error) => {
        console.error("Error fetching dates:", error);
      });
  }, []);

  const handleConfirmChange = async (dateId, newState) => {
    try {
      const dateToUpdate = dates.find((date) => date.date._id === dateId);
      dateToUpdate.date.state = newState;
      await updateDate(dateId, dateToUpdate);
      handleDeleteDates(dateId, newState);
      const updatedDates = await getAllDatesWithPets();
      setDates(updatedDates);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating date state:", error);
      toast.error(
        "Ha ocurrido un error al momento de cambiar el estado de la cita"
      );
    }
  };

  const handleDeleteDates = async (dateId, newState) => {
    if (newState === "finalizado") {
      deleteDate(dateId);
      toast.success("La cita fue finalizada con éxito");
      return;
    } else if (newState === "cancelado") {
      deleteDate(dateId);
      toast.success("La cita ha sido cancelada");
      return;
    } else {
      toast.success(`La cita ha cambiado de estado a: ${newState}`);
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

  const filteredDates = dates.filter((date) => {
    const formattedDate = new Date(date.date.date);
    const isDateInRange =
      startDate && endDate
        ? formattedDate >= new Date(startDate) &&
          formattedDate <= new Date(endDate)
        : true;
    return (
      (date.date.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
        date.pet.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      isDateInRange
    );
  });
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
        <div>
          <p className="titleDate">Agenda</p>
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
                  <th>Mascota</th>
                  <th>Fecha</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {filteredDates && filteredDates.length > 0 ? (
                  filteredDates.map((date, index) => (
                    <tr key={index}>
                      <td>{date.date.person}</td>
                      <td>{date.pet.name}</td>
                      <td>{new Date(date.date.date).toLocaleDateString()}</td>
                      <td>{date.date.hourStart}</td>
                      <td>{date.date.hourEnd}</td>
                      <td>
                        <select
                          value={date.date.state}
                          onChange={(e) =>
                            handleShowModal(
                              date.date._id,
                              e.target.value,
                              date.date
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
                      <td colSpan="6">
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

export default Dates;
