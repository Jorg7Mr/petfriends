const { Pet } = require("../models/pet.model");

const createNewPet = (req, res) => {
  const data = req.body;
  const pet = new Pet(data);
  pet.image = req.body.image;
  pet
    .save()
    .then((newPet) => {
      res.status(200).json(newPet);
    })
    .catch((error) => {
      console.error("Error creating pet:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const findPets = (req, res) => {
  Pet.find({})
    .then((pets) => {
      res.status(200).json({ pets });
    })
    .catch((error) => {
      console.error("Error finding pets:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const updatePet = (req, res) => {
  const petId = req.params.id;
  const updatedData = req.body;
  Pet.findByIdAndUpdate(petId, updatedData, { new: true })
    .then((updatedPet) => {
      res.status(200).json(updatedPet);
    })
    .catch((error) => {
      console.error("Error updating pet:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const deletePet = (req, res) => {
  const petId = req.params.id;
  Pet.findByIdAndDelete(petId)
    .then(() => {
      res.status(200).json({ message: "Pet deleted" });
    })
    .catch((error) => {
      console.error("Error deleting pet:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  createNewPet,
  findPets,
  updatePet,
  deletePet,
};
