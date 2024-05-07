const Dates = require("../models/date.model");
const { Pet } = require("../models/pet.model");

const createNewDate = (req, res) => {
  const data = req.body;
  const date = new Dates(data);
  date
    .save()
    .then((newDate) => {
      res.status(200).json(newDate);
    })
    .catch((error) => {
      console.error("Error creating date:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const findDates = (req, res) => {
  Dates.find({})
    .then((dates) => {
      res.status(200).json({ dates });
    })
    .catch((error) => {
      console.error("Error finding dates:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const getAllDatesWithPets = (req, res) => {
  Dates.find({})
    .then((dates) => {
      const datesWithPets = [];
      Promise.all(
        dates.map((date) => {
          const petId = date.pet;

          return Pet.findById(petId)
            .then((pet) => {
              if (!pet) {
                datesWithPets.push({ date, pet: null });
              } else {
                datesWithPets.push({
                  date,
                  pet: { id: pet._id, name: pet.name },
                });
              }
            })
            .catch((error) => {
              console.error("Error finding pet:", error);
              datesWithPets.push({ date, pet: null });
            });
        })
      )
        .then(() => {
          res.status(200).json(datesWithPets);
        })
        .catch((error) => {
          console.error("Error finding dates:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((error) => {
      console.error("Error finding dates:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const updateDate = (req, res) => {
  const dateId = req.params.id;
  const { state } = req.body.date; 
  Dates.findByIdAndUpdate(dateId, { state }, { new: true })
    .then((updatedDate) => {
      res.status(200).json(updatedDate);
    })
    .catch((error) => {
      console.error("Error updating date:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const deleteDate = (req, res) => {
  const dateId = req.params.id;
  Dates.findByIdAndDelete(dateId)
    .then(() => {
      res.status(200).json({ message: "Date deleted" });
    })
    .catch((error) => {
      console.error("Error deleting date:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  createNewDate,
  findDates,
  getAllDatesWithPets,
  updateDate,
  deleteDate,
};
