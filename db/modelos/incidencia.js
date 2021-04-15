const { Schema, model } = require("mongoose");

const IncidenciaSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  usuarioCreador: {
    type: Schema.Types.ObjectId,
    ref: "Usuario"
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
