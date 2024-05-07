const express = require("express");
const { findPets, createNewPet, updatePet, deletePet } = require("../controllers/pet.controllers.js");

const router = express.Router();

router.get("/", findPets);
router.post("/new", createNewPet);
router.put("/update/:id", updatePet);
router.delete("/deleted/:id", deletePet);

module.exports = {
  petRouter: router,
};
