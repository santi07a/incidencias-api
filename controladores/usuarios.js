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
    respuesta.error = error;
  } return respuesta;
};

const crearUsuario = async nuevoUsuario => {
  const respuesta = {
    usuario: null,
    error: null
  };
  const usuarioEncontrado = await Usuario.findOne({
    email: nuevoUsuario.email,
    telefono: nuevoUsuario.telefono
  });
  if (usuarioEncontrado) {
    const error = generaError("El usuario ya existe", 409);
    respuesta.error = error;
  } else {
    const nuevoUsuarioBD = await Usuario.create(nuevoUsuario);
    respuesta.usuario = nuevoUsuarioBD;
  } return respuesta;
};

const putUsuario = async (usuarioRecibido, idUsuario) => {
  const respuesta = {
    usuario: null,
    error: null
  };
  let usuarioCoincidente;
  try {
    usuarioCoincidente = await Usuario.findById(idUsuario);
  } catch (err) {
    if (err.message === `Cast to ObjectId failed for value "${err.value}" at path "_id" for model "Usuario"`) {
      respuesta.error = generaError("La id introducida no tiene la forma correcta", 400);
    }
  }
  if (usuarioCoincidente && !respuesta.error) {
    await usuarioCoincidente.updateOne(usuarioRecibido);
    respuesta.usuario = usuarioRecibido;
  } else if (!respuesta.error) {
    const { usuario: usuarioSustituido, error } = await crearUsuario(usuarioRecibido);
    respuesta.usuario = usuarioSustituido;
    respuesta.error = error;
  }
  return respuesta;
};

const borrarUsuario = async idUsuario => {
  const respuesta = {
    usuario: null,
    error: null
  };
  let usuarioCoincidente = null;
  try {
    usuarioCoincidente = await Usuario.findById(idUsuario);
    respuesta.usuario = usuarioCoincidente;
  } catch (err) {
    if (err.message === `Cast to ObjectId failed for value "${err.value}" at path "_id" for model "Usuario"`) {
      respuesta.error = generaError("La id introducida no tiene la forma correcta", 400);
    }
  }
  await Usuario.findByIdAndDelete(idUsuario);
  return respuesta;
};
module.exports = {
  getUsuarios,
  getUsuario,
  crearUsuario,
  putUsuario,
  borrarUsuario
};
