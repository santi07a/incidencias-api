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
const getUsuario = async id => {
  const usuario = await Usuario.findById(id, "-_id");
  const respuesta = {
    usuario: null,
    error: null
  };
  if (usuario) {
    respuesta.usuario = usuario;
  } else {
    const error = generaError("El usuario solicitado no existe", 404);
    respuesta.erorr = error;
  } return respuesta;
};
module.exports = {
  getUsuarios,
  getUsuario
};
