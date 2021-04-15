const Usuario = require("../db/modelos/usuario");
const { generaError } = require("../errores/errores");

const getUsuarios = async () => {
  const respuesta = {
    error: null,
    usuarios: null
  };
  const usuarios = await Usuario.find();
  if (!usuarios) {
    const error = generaError("No hay usuarios", 409);
    respuesta.error = error;
  } else {
    respuesta.usuarios = usuarios;
  } return respuesta;
};

module.exports = {
  getUsuarios
};
