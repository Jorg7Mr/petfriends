const mongoose = require("mongoose");

const DateServiceSchema = new mongoose.Schema({
  serviceList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  person: {
    type: String,
    required: true,
    minlength: [5, "El nombre no puede ser menor a 5 caracteres"],
    maxlength: [20, "El nombre no puede ser mayor a 20 caracteres"],
    required: true,
  },
  telephone: {
    type: String,
    maxlength: [15, "El numero no puede ser mayor a 15 cifras"],
    required: true,
  },
  pet: {
    type: String,
    minlength: [5, "El nombre no puede ser menor a 5 caracteres"],
    maxlength: [20, "El nombre no puede ser mayor a 20 caracteres"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  hourStart: {
    type: String,
    required: true,
  },
  hourEnd: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: "pendiente",
    enum: ["pendiente", "finalizado", "cancelado"],
  },
});

const DatesService = mongoose.model("DatesService", DateServiceSchema);

module.exports = DatesService;
