const mongoose = require("mongoose");

const DateSchema = new mongoose.Schema({
  person: {
    type: String,
    required: true,
    minlength: 5 
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  hourStart: {
    type: String,
    required: true
  },
  hourEnd: {
    type: String,
    required: true
  },
  state: {
    type: String,
    default: "pendiente",
    enum: ["pendiente", "finalizado", "cancelado"]
  }
});

const Dates = mongoose.model("Dates", DateSchema);

module.exports = Dates;
