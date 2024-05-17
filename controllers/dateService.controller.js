const DatesService = require("../models/dateService.model");
const { Service } = require("../models/service.model");

const createNewDateService = (req, res) => {
  const data = req.body;
  const dateService = new DatesService(data);
  dateService
    .save()
    .then((newDateService) => {
      res.status(200).json(newDateService);
    })
    .catch((error) => {
      console.error("Error creating date service:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const getAllDateServices = (req, res) => {
  DatesService.find({})
    .then((dateServices) => {
      res.status(200).json({ dateServices });
    })
    .catch((error) => {
      console.error("Error finding date services:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const getAllDatesWithServices = (req, res) => {
  DatesService.find({})
    .then((datesServices) => {
      const datesServicesWithServices = [];
      Promise.all(
        datesServices.map((dateService) => {
          const serviceIds = dateService.serviceList;

          return Service.find({ _id: { $in: serviceIds } })
            .then((services) => {
              const formattedServices = services.map((service) => ({
                id: service._id,
                name: service.name,
                price: service.price,
              }));

              datesServicesWithServices.push({
                dateService,
                services: formattedServices,
              });
            })
            .catch((error) => {
              console.error("Error finding services:", error);
              datesServicesWithServices.push({ dateService, services: [] });
            });
        })
      )
        .then(() => {
          res.status(200).json(datesServicesWithServices);
        })
        .catch((error) => {
          console.error("Error finding date services:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((error) => {
      console.error("Error finding date services:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const updateDateService = (req, res) => {
  const { id } = req.params; // Assuming id is sent as a URL parameter
  const { newState } = req.body; // Assuming newState is sent in the request body
  console.log("data ", req.body);
  const validStates = ["pendiente", "finalizado", "cancelado"];
  if (!validStates.includes(newState)) {
    return res.status(400).json({ error: "Invalid state value" });
  }

  DatesService.findByIdAndUpdate(
    id,
    { state: newState },
    { new: true, runValidators: true }
  )
    .then((updatedDocument) => {
      if (!updatedDocument) {
        return res.status(404).json({ error: "Document not found" });
      }
      res.status(200).json(updatedDocument);
    })
    .catch((error) => {
      console.error("Error updating document:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  createNewDateService,
  getAllDateServices,
  getAllDatesWithServices,
  updateDateService,
};
