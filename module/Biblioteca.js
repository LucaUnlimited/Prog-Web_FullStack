const mongoose = require("mongoose");
const { Schema } = mongoose;

const bibliotecaSchema = new Schema({
  nombre: String,
  correoElectronico: String,
  domicilio: {
    ciudad: String,
    cp: String,
    direccion: String,
  },
});

const Biblioteca = mongoose.model("Biblioteca", bibliotecaSchema);

module.exports = Biblioteca;
