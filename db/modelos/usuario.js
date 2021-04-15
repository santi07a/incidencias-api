const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contraseña: {
    type: String,
    required: true
  },
  telefono: String,
  direccion: String,
  fechaAlta: {
    type: String,
    required: true
  },
  incidenciasSeguidas: {
    type: [String],
    required: true
  }
});

const Usuario = model("Usuario", UsuarioSchema, "incidencias");

module.exports = Usuario;
