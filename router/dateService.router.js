const express = require("express");
const router = express.Router();
const {
  createNewDateService,
  getAllDateServices,
  getAllDatesWithServices,
  updateDateService,
} = require("../controllers/dateService.controller");

router.post("/new", createNewDateService);
router.get("/", getAllDateServices);
router.get("/withServices", getAllDatesWithServices);
router.put("/:id", updateDateService);
module.exports = {
  dateServiceRouter: router,
};
