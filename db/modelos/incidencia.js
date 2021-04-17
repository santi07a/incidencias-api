const { Schema, model } = require("mongoose");

const IncidenciaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  usuarioCreador: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
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
  direccion: String,
  registrada: {
    type: Number,
    required: true
  },
  latitud: Number,
  longitud: Number,
  tipoIncidencia: {
    type: Schema.Types.ObjectId,
    ref: "TipoIncidencia",
    required: true
  },
  resuelta: {
    type: Boolean,
    required: true
  }
});

const Incidencia = model("Incidencia", IncidenciaSchema, "incidencias");

module.exports = Incidencia;
