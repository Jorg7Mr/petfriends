import React, { useEffect, useState } from "react";
import "../../styles/pet/pets.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePet from "../../hooks/usePet";
import PetList from "../../components/pet/petList";
import PetNotFound from "../../components/pet/petNotFound";
import "../../styles/date/petDate.css";
import useDate from "../../hooks/useDate";
import IsDateTimeValid from "../../common/isValidDate";
import IsHourValid from "../../common/isValidHours";

const Pet = () => {
  const [showModal, setShowModal] = useState(false);
  const [imagePet, setImagePet] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [showModalDate, setShowModalDate] = useState(false);
  const [modalPetData, setModalPetData] = useState([]);
  const [person, setPerson] = useState("");
  const [date, setDate] = useState("");
  const [hourStart, setHourStart] = useState("");
  const [hourEnd, setHourEnd] = useState("");

  const { createPet, getAllPets, pets, error, isLoading } = usePet();
  const {
    createNewDate,
    error: errorDate,
    isLoading: isLoadingData,
  } = useDate();

  useEffect(() => {
    getAllPets();
  }, []);

  const rebootDataPet = () => {
    setImagePet(null);
    setName("");
    setDescription("");
    setType("");
  };

  const rebootDataDate = () => {
    setPerson("");
    setDate("");
    setHourStart("");
    setHourEnd("");
    setImagePet("");
  };

  const handleShowModal = () => {
    setShowModal(true);
    rebootDataPet();
  };

  const handleHideModal = () => {
    setShowModal(false);
    rebootDataPet();
  };

  const handleShowModalDate = (petData) => {
    rebootDataDate();
    setModalPetData(petData);
    setShowModalDate(true);
  };

  const handleHideModalDate = () => {
    setShowModalDate(false);
  };

  const savePet = () => {
    if (
      !imagePet ||
      !name ||
      !description ||
      !type ||
      !date ||
      !hourStart ||
      !hourEnd
    ) {
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

    let descriptionLength = description.length;
    if (descriptionLength >= 200) {
      toast.error(
        `La descripción solo puede tener hasta 199 carácteres, tienes ${descriptionLength} caracteres`
      );
      return;
    }

    const petData = {
      image: imagePet,
      name: name,
      description: description,
      type: type,
    };

    createPet(petData)
      .then(() => {
        toast.success("Mascota creada con éxito");
        setShowModal(false);
        getAllPets();
      })
      .catch((error) => {
        console.error("Error al crear la mascota:", error);
        toast.error("Error al crear la mascota");
      });
  };

  const savePetDate = () => {
    if (!person || !modalPetData || !date || !hourStart || !hourEnd) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    let personLength = person.length;
    if (personLength < 5) {
      toast.error(
        `La longitud del nombre debe ser igual o mayor a 5, tamaño actual ${personLength}`
      );
      return;
    }

    const formData = {
      person: person,
      pet: modalPetData._id,
      date: date,
      hourStart: hourStart,
      hourEnd: hourEnd,
    };
    createNewDate(formData)
      .then(() => {
        toast.success("Cita creada con éxito");
        rebootDataDate();
        setShowModalDate(false);
      })
      .catch((error) => {
        console.error("Error al crear la cita:", error);
        toast.error("Error al crear la cita");
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePet(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Por favor, selecciona un archivo de imagen válido.");
      setImagePet(null);
    }
  };

  // Función para filtrar mascotas por nombre
  const filteredPets = pets?.filter((pet) =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para filtrar mascotas por tipo
  const filteredPetsByType = filterType
    ? filteredPets?.filter((pet) => pet?.type === filterType)
    : filteredPets;
  return (
    <>
      <div>
        <Modal
          open={showModal}
          onHide={handleHideModal}
          onSave={savePet}
          title="Crear Mascota"
        >
          <div className="formPet">
            <div className="picturePet">
              <div>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
              <div
                className="picturePet"
                onClick={() => document.getElementById("fileInput").click()}
              >
                {imagePet ? (
                  <div className="contentImgPet">
                    <img
                      src={
                        imagePet instanceof Blob
                          ? URL.createObjectURL(imagePet)
                          : imagePet
                      }
                      alt="Preview"
                      className="imgPet"
                    />
                  </div>
                ) : (
                  <div className="contentImgPet">
                    <img
                      src="/image/addpetfoto.png"
                      alt="Sin imagen"
                      className="imgPet"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="contentPetForm">
              <div>
                <p className="txtName">Nombre</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="txtNombreForm"
                />
              </div>
              <div>
                <p className="txtDescription">Descripción</p>
                <textarea
                  className="textDescriptionForm"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <p className="txtType">Tipo</p>
                <div className="custom-select">
                  <select
                    className="selectTypePetForm "
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          open={showModalDate}
          onHide={handleHideModalDate}
          onSave={savePetDate}
          title="Registrar PetCita"
        >
          <div className="formPetDate">
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
              <p className="txtDatePet txtDate">Mascota</p>
              <input
                type="text"
                value={modalPetData.name}
                readOnly
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
        </Modal>

        <div className="contentOptionPet">
          <p className="titlePet">Mascotas</p>
          <button className="btnAddPet" onClick={handleShowModal}>
            Agregar
          </button>
        </div>
        <div className="contentPets">
          <div className="contentPetsFilters">
            <div className="contentSelectTypePets">
              <select
                className="selectTypePets"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">Tipo de Mascota</option>
                <option>Perro</option>
                <option>Gato</option>
              </select>
            </div>
            <div className="searchContents">
              <input
                placeholder="Buscar Nombre"
                className="inputSearchs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="searchIcons">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>
          </div>
          <div>
            {filteredPetsByType?.length === 0 ||
            filteredPetsByType === undefined ? (
              <div className="noPetsMessage">
                <PetNotFound message={"No se han encontrado mascotas"} />
              </div>
            ) : (
              <div className="contentOptionsPets petGrid">
                {filteredPetsByType.map((pet) => (
                  <PetList
                    key={pet.id}
                    data={pet}
                    handleShowModalDate={handleShowModalDate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Pet;
