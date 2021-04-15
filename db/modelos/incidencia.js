const { Schema, model } = require("mongoose");

const IncidenciaSchema = new Schema({
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

const Incidencia = model("Incidencia", IncidenciaSchema, "incidencias");

module.exports = Incidencia;
