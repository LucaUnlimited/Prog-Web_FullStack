const mongoose = require("mongoose");
const { Schema } = mongoose;

const libroSchema = new Schema({
  nombre: String,
  descripcion: String,
  fechaIngreso: String,
  genero: [String],
});

const Libro = mongoose.model("Libro", libroSchema);

module.exports = Libro;
