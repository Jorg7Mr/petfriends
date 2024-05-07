const express = require("express");
const router = express.Router();
const {
  createNewDate,
  findDates,
  getAllDatesWithPets,
  updateDate,
  deleteDate,
} = require("../controllers/date.controller.js");

router.post("/new", createNewDate);
router.get("/", findDates);
router.get("/withPets", getAllDatesWithPets);
router.put("/:id", updateDate);
router.delete("/:id", deleteDate);

module.exports = {
  dateRouter: router,
};
