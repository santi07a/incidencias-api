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
  contraseña: {
    type: String,
    required: true
  },
  telefono: String,
  direccion: String,
  fechaAlta: {
    type: Number,
    required: true
  },
  incidenciasSeguidas: {
    type: [String],
    required: true
  }
});

const Usuario = model("Usuario", UsuarioSchema, "usuarios");

module.exports = Usuario;
