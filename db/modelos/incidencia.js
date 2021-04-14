const { Schema, model } = require("mongoose");

const IncidenciaSchema = new Schema({
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
  fecha: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  foto: String,
  tipoIncidencia: {
    type: String,
    required: true
  },
  localizacion: {
    type: String,
    required: true
  },
  resuelta: {
    type: Boolean
  }
});

const Incidencia = model("Incidencia", IncidenciaSchema, "incidencias");

module.exports = Incidencia;
