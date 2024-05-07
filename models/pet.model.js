const mongoose = require("mongoose");
const { Schema } = mongoose;

const PetSchema = new Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "El nombre es necesario"],
    minlength: [2, "El nombre de la mascota debe tener al menos 2 caracteres"],
    unique: true,
  },
  description: {
    type: String,
    maxlength: [200, "La descripción de la mascota no puede tener más de 200 caracteres"],
  },
  type: {
    type: String,
    enum: ["Perro", "Gato"],
  },
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = {
  Pet,
};

