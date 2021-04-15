const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  usuarioCreador: {
    type: String,
    required: true
  },
  fotoIncidencia: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  registrada: {
    type: String,
    required: true
  },
  latitud: {
    type: Number,
    required: true
  },
  longitud: {
    type: Number,
    required: true
  },
  tipoIncidencia: {
    type: String,
    required: true
  },
  resuelta: {
    type: Boolean,
    required: true
  }
});

const Usuario = model("Usuario", UsuarioSchema, "incidencias");

module.exports = Usuario;
