const mongoose = require("mongoose");
const { Schema } = mongoose;

const ServiceSchema = new Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "El nombre del servicio es necesario"],
    minlength: [2, "El nombre del servicio debe tener al menos 2 caracteres"],
    maxlength: [30, "El nombre del servicio no puede ser mayor a 15 caracteres"],
  },
  price: {
    type: Number,
    maxlength: [10, "El precio no puede ser mayor a 10 cifras"],
  },
});

const Service = mongoose.model("Service", ServiceSchema);

module.exports = {
  Service,
};
