const {Service} = require("../models/service.model");

const createNewService = (req, res) => {
    const data = req.body;
    const service = new Service(data);
    service.image = req.body.image;
    service
      .save()
      .then((newService) => {
        res.status(200).json(newService);
      })
      .catch((error) => {
        console.error("Error creating service:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
}

const findService = (req, res) => {
    Service.find({})
      .then((service) => {
        res.status(200).json({ service });
      })
      .catch((error) => {
        console.error("Error finding service:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  };

module.exports = {
    findService,
    createNewService,
};