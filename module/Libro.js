const mongoose = require("mongoose");
const { Schema } = mongoose;

const libroSchema = new Schema({
  nombre: String,
  descripcion: String,
  fechaDeIngreso: String,
  genero: [String],
});

const Libro = mongoose.model("Libro", libroSchema);

module.exports = Libro;
