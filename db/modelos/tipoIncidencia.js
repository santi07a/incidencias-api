const { Schema, model } = require("mongoose");

const TipoIncidenciaSchema = new Schema({
  tipo: {
    type: String,
    required: true
  }
});

const TipoIncidencia = model("TipoIncidencia", TipoIncidenciaSchema, "tipoIncidencia");

module.exports = TipoIncidencia;
