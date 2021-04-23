const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
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
  contrasenya: {
    type: String,
    required: true
  },
  telefono: String,
  direccion: String,
  fechaAlta: {
    type: Number
  },
  incidenciasVotadas: [{
    type: Schema.Types.ObjectId,
    ref: "Incidencia"
  }]
});

const Usuario = model("Usuario", UsuarioSchema, "usuarios");

module.exports = Usuario;
