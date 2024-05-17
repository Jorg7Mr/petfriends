const express = require("express");
const {
  findService,
  createNewService,
} = require("../controllers/service.controller");

const router = express.Router();

router.get("/", findService);
router.post("/new", createNewService);

module.exports = {
  serviceRouter: router,
};
