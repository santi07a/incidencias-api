const { Schema, model } = require("mongoose");

const IncidenciaSchema = new Schema({
  nombre: {
    type: String,
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
  direccion: String,
  registrada: {
    type: String,
    required: true
  },
  latitud: Number,
  longitud: Number,
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
