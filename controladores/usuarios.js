const Usuario = require("../db/modelos/usuario");
const { generaError } = require("../errores/errores");

const getUsuarios = async () => {
  const respuesta = {
    error: false,
    usuarios: null
  };
  const usuarios = await Usuario.find();
  respuesta.usuarios = usuarios;
  return respuesta;
};

module.exports = {
  getUsuarios
};
