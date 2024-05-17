import React, { useEffect, useState } from "react";
import "../../styles/service/service.css";
import ServiceList from "../../components/service/serviceList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../components/modal";
import useService from "../../hooks/useService";
import PetNotFound from "../../components/pet/petNotFound";
import ServiceCart from "../../components/service/serviceCart";

const Service = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageService, setImageService] = useState("");
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const { createService, getAllServices, isLoading, error } = useService();
  const [dataService, setDataService] = useState([]);
  const [allService, setAllService] = useState([]);
  const [showAddCartButton, setShowAddCartButton] = useState(true);
  const fetchService = async () => {
    const data = await getAllServices();
    setDataService(data?.service);
  };

  useEffect(() => {
    fetchService();
  }, []);

  const rebootDataService = () => {
    setImageService("");
    setPrice(0);
    setName("");
  };

  const handleHideModal = () => {
    setShowModal(false);
    rebootDataService();
  };

  const saveService = () => {
    if (!imageService || !name || !price) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    let serviceNameLength = name.length;
    if (serviceNameLength < 5) {
      toast.error(
        `La longitud del nombre del servicio debe ser igual o mayor a 5 caracteres, tamaño actual ${serviceNameLength}`
      );
      return;
    }

    if (serviceNameLength >= 30) {
      toast.error(
        `La longitud del nombre del servicio debe ser menor o igual 30 caracteres, tamaño actual ${serviceNameLength}`
      );
      return;
    }

    let servicePriceLength = price.length;
    if (servicePriceLength >= 10) {
      toast.error(
        `El precio no puedo ser mayor a 10 cifrar, tamaño actual ${servicePriceLength}`
      );
      return;
    }

    const serviceData = {
      image: imageService,
      name: name,
      price: price,
    };

    createService(serviceData)
      .then(() => {
        toast.success("Servicio creado con éxito");
        rebootDataService();
        setShowModal(false);
        fetchService();
      })
      .catch((error) => {
        console.error("Error al crear el servicio:", error);
        toast.error("Error al crear el servicio");
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageService(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Por favor, selecciona un archivo de imagen válido.");
      setImageService(null);
    }
  };

  return (
    <>
      <div>
        <Modal
          open={showModal}
          onHide={handleHideModal}
          onSave={saveService}
          title="Crear Servicio"
        >
          <div className="formServiceForm">
            <div className="pictureService">
              <div>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
              <div
                className="pictureService"
                onClick={() => document.getElementById("fileInput").click()}
              >
                {imageService ? (
                  <div className="contentImgService">
                    <img
                      src={
                        imageService instanceof Blob
                          ? URL.createObjectURL(imageService)
                          : imageService
                      }
                      alt="Preview"
                      className="imgServiceForm"
                    />
                  </div>
                ) : (
                  <div className="contentImgService">
                    <img
                      src="/image/servicio.png"
                      alt="Sin imagen"
                      className="imgServiceForm"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="contentServiceForm">
              <div>
                <p className="txtNameService">Servicio</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="txtNameServiceForm"
                />
              </div>
              <div>
                <p className="txtPriceService">Precio</p>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="txtPriceServiceForm"
                />
              </div>
            </div>
          </div>
        </Modal>

        <div className="contentService">
          <p className="titleServices">Servicios</p>
          <button className="btnAddService" onClick={() => setShowModal(true)}>
            Nuevo Servicio
          </button>
        </div>
        {dataService?.length === 0 || dataService === undefined ? (
          <div>
            <PetNotFound message={"No se ha encontrado ningún servicio"} />
          </div>
        ) : (
          <div className="contentServiceFlex">
            <div className="contentOptionsService serviceGrid">
              {dataService?.map((service) => (
                <ServiceList
                  key={service.id}
                  data={service}
                  allService={allService}
                  setAllService={setAllService}
                  showAddCartButton={showAddCartButton}
                  setShowAddCartButton={setShowAddCartButton}
                />
              ))}
            </div>
            <div>
              <ServiceCart
                allService={allService}
                setAllService={setAllService}
              />
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Service;
