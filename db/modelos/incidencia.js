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
  descripcion: {
    type: String,
    required: true
  },
  fotoIncidencia: String,
  direccion: String,
  codigoPostal: String,
  registrada: Number,
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
  },
  comentario: String,
  votos: {
    type: Number,
    required: true,
    default: 0
  }
});

const Incidencia = model("Incidencia", IncidenciaSchema, "incidencias");

module.exports = Incidencia;
