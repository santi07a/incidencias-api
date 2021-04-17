const Usuario = require("../db/modelos/usuario");
const { generaError } = require("../errores/errores");
const { InformeRespuesta, estructuraJsonResponse } = require("./utils/respuesta");
const transport = require("./utils/transportMail");

const getUsuarios = async () => {
  const informeRespuesta = new InformeRespuesta();
  const usuarios = await Usuario.find();
  if (!usuarios) {
    const error = generaError("No hay usuarios", 409);
    informeRespuesta.error = error;
  } else {
    informeRespuesta.jsonResponse = estructuraJsonResponse({ usuarios });
  }
  return informeRespuesta;
};

const getUsuario = async idUsuario => {
  const informeRespuesta = new InformeRespuesta();
  const usuario = await Usuario.findById(idUsuario, "-_id");
  if (usuario) {
    informeRespuesta.jsonResponse = estructuraJsonResponse({ usuario });
  } else {
    const error = generaError("El usuario solicitado no existe", 404);
    informeRespuesta.error = error;
  }
  return informeRespuesta;
};

const postUsuario = async usuarioRecibido => {
  const informeRespuesta = new InformeRespuesta();
  const usuarioEncontrado = await Usuario.findOne({
    email: usuarioRecibido.email,
    telefono: usuarioRecibido.telefono
  });
  let usuarioCreado;
  if (usuarioEncontrado) {
    const error = generaError("El usuario ya existe", 409);
    informeRespuesta.error = error;
  } else {
    const fecha = new Date().getTime();
    usuarioRecibido.fechaAlta = +fecha;
    usuarioCreado = await Usuario.create(usuarioRecibido);
  }
  if (!informeRespuesta.error) {
    const mensaje = {
      from: "ciutadaverd@outlook.es",
      to: usuarioCreado.email,
      subject: "Confirmación registro en Ciutadà Verd",
      html: (`<h1>Su registro ha sido confirmado</h1><br/><p>Muchas gracias por registrarte con nosotros, ${usuarioCreado.nombre}. Hoy eres un ciudadano más comprometido con el ambiente y con la ciudad.</p><br/><p style="color:#5d9b9b">Para seguir navegando en nuestra web presiona <strong style="text-decoration-line:underline">aquí</strong></p>`)
    };
    transport.sendMail(mensaje);
    informeRespuesta.jsonResponse = estructuraJsonResponse({ usuario: usuarioCreado });
  }
  return informeRespuesta;
};

const putUsuario = async (usuarioRecibido, idUsuario) => {
  const informeRespuesta = new InformeRespuesta();
  let usuarioCoincidente;
  try {
    usuarioCoincidente = await Usuario.findById(idUsuario);
  } catch (err) {
    if (err.message === `Cast to ObjectId failed for value "${err.value}" at path "_id" for model "Usuario"`) {
      informeRespuesta.error = generaError("La id introducida no tiene la forma correcta", 400);
    }
  }
  if (usuarioCoincidente && !informeRespuesta.error) {
    await usuarioCoincidente.updateOne(usuarioRecibido);
    informeRespuesta.jsonResponse = estructuraJsonResponse({ usuario: usuarioRecibido });
  } else if (!informeRespuesta.error) {
    const { usuario: usuarioSustituido, error } = await crearUsuario(usuarioRecibido);
    informeRespuesta.jsonResponse = estructuraJsonResponse({ usuario: usuarioSustituido });
    informeRespuesta.error = error;
  }
  return informeRespuesta;
};

const borrarUsuario = async idUsuario => {
  const informeRespuesta = new InformeRespuesta();
  let usuarioCoincidente = null;
  try {
    usuarioCoincidente = await Usuario.findById(idUsuario);
  } catch (err) {
    if (err.message === `Cast to ObjectId failed for value "${err.value}" at path "_id" for model "Usuario"`) {
      informeRespuesta.error = generaError("La id introducida no tiene la forma correcta", 400);
    }
  }
  if (usuarioCoincidente && !informeRespuesta.error) {
    informeRespuesta.jsonResponse = estructuraJsonResponse({ usuario: usuarioCoincidente });
    await Usuario.findByIdAndDelete(idUsuario);
  } else if (!informeRespuesta.error) {
    informeRespuesta.error = generaError("La id introducida no corresponde a ninguna usuario", 400);
  }
  return informeRespuesta;
};
module.exports = {
  getUsuarios,
  getUsuario,
  postUsuario,
  putUsuario,
  borrarUsuario
};
