const Incidencia = require("../db/modelos/incidencia");
const Usuario = require("../db/modelos/usuario");
const TipoIncidencia = require("../db/modelos/tipoIncidencia");
const { generaError } = require("../errores/errores");
const { InformeRespuesta, estructuraJsonResponse } = require("./utils/respuesta");
const path = require('path');

const getIncidencias = async (queries) => {
  const condicion = {};
  if (queries.tipo) {
    const [tipoIncidencia] = await TipoIncidencia.find({ tipo: queries.tipo.split("-").join(" ") });
    condicion.tipoIncidencia = tipoIncidencia._id;
  }
  const informeRespuesta = new InformeRespuesta();
  /* const direccionOrden = queries.orden === "DESC" ? -1 : 1; */
  const tipoOrden = queries.ordenPor ? (queries.ordenPor === "fecha" ? "registrada" : "votos") : "registrada";
  console.log(tipoOrden);
  const incidencias = await Incidencia.find(condicion)
    .limit(queries.nPorPagina ? +queries.nPorPagina : 0)
    .skip(queries.nPorPagina && queries.pagina ? (+queries.nPorPagina * +queries.pagina) - +queries.nPorPagina : 0)
    .populate("usuarioCreador", "nombre apellidos email telefono _id")
    .populate("tipoIncidencia", "tipo -_id");
  if (tipoOrden) {
    incidencias.sort((a, b) => b[tipoOrden] - a[tipoOrden]);
  }
  informeRespuesta.jsonResponse = estructuraJsonResponse({ incidencias });
  return informeRespuesta;
};

const getIncidencia = async idIncidencia => {
  const informeRespuesta = new InformeRespuesta();
  let incidencia;
  try {
    incidencia = await Incidencia.findById(idIncidencia)
      .populate("usuarioCreador", "nombre apellidos email telefono -_id")
      .populate("tipoIncidencia", "tipo -_id");
  } catch (err) {
    if (err.message === `Cast to ObjectId failed for value "${err.value}" at path "_id" for model "Incidencia"`) {
      informeRespuesta.error = generaError("La id introducida no tiene la forma correcta", 400);
    }
  }
  if (incidencia && !informeRespuesta.error) {
    informeRespuesta.jsonResponse = estructuraJsonResponse({ incidencia });
  } else if (!informeRespuesta.error) {
    informeRespuesta.error = generaError("La incidencia solicitada no existe", 404);
  } return informeRespuesta;
};

const getIncidenciasSimilares = async (coordenadas) => {
  const informeRespuesta = new InformeRespuesta();
  if (!coordenadas.latitud || !coordenadas.longitud) {
    informeRespuesta.error = generaError("Tienes que introducir unas coordenadas con latitud y longitud", 400);
  } else {
    const incidencias = await Incidencia.find();
    const distanciaEnMetros = 2; // realmente no son metros, un 2 corresponde a unos 10 bloques del eixample
    const distancia = distanciaEnMetros * 90 / 10000;
    const incidenciasSimilares = incidencias
      .map(incidencia => ({
        ...incidencia._doc,
        cuadradoDistancia: (incidencia.latitud - coordenadas.latitud) ** 2 + (incidencia.longitud - coordenadas.longitud) ** 2
      }))
      .filter(incidencia => incidencia.cuadradoDistancia < distancia ** 2)
      .sort((i1, i2) => i1.cuadradoDistancia - i2.cuadradoDistancia)
      .slice(0, 5);
    informeRespuesta.jsonResponse = estructuraJsonResponse({ incidencias: incidenciasSimilares });
  }
  return informeRespuesta;
};

const postIncidencia = async (incidenciaRecibida, nombreOriginal, idUsuario) => {
  const informeRespuesta = new InformeRespuesta();
  const tipoIncidencia = await TipoIncidencia.findOne({ tipo: incidenciaRecibida.tipoIncidencia });
  incidenciaRecibida.tipoIncidencia = `${tipoIncidencia._id}`;
  const fecha = new Date().getTime();
  incidenciaRecibida.registrada = +fecha;
  incidenciaRecibida.usuarioCreador = idUsuario;
  const nuevaIncidencia = await Incidencia.create(incidenciaRecibida);
  const extension = path.extname(nombreOriginal);
  await nuevaIncidencia.updateOne({ fotoIncidencia: `incidencia${nuevaIncidencia.id}${extension}` });
  const incidenciaPosteada = await Incidencia.findById(nuevaIncidencia.id)
    .populate("usuarioCreador", "email _id")
    .populate("tipoIncidencia", "tipo -_id");
  informeRespuesta.jsonResponse = estructuraJsonResponse({ incidencia: incidenciaPosteada });
  return informeRespuesta;
};

const putIncidencia = async (incidenciaRecibida, idIncidencia) => {
  const informeRespuesta = new InformeRespuesta();
  let incidenciaCoincidente;
  try {
    incidenciaCoincidente = await Incidencia.findById(idIncidencia);
  } catch (err) {
    if (err.message === `Cast to ObjectId failed for value "${err.value}" at path "_id" for model "Incidencia"`) {
      informeRespuesta.error = generaError("La id introducida no tiene la forma correcta", 400);
    }
  }
  if (incidenciaCoincidente && !informeRespuesta.error) {
    await incidenciaCoincidente.updateOne(incidenciaRecibida);
    const incidenciaModificada = await Incidencia.findById(idIncidencia)
      .populate("usuarioCreador", "nombre apellidos email telefono -_id")
      .populate("tipoIncidencia", "tipo -_id");
    informeRespuesta.jsonResponse = estructuraJsonResponse({ incidencia: incidenciaModificada });
  } else if (!informeRespuesta.error) {
    informeRespuesta.error = generaError("La id introducida no corresponde a ninguna incidencia", 400);
  }
  return informeRespuesta;
};

const borrarIncidencia = async idIncidencia => {
  const informeRespuesta = new InformeRespuesta();
  let incidenciaCoincidente = null;
  try {
    incidenciaCoincidente = await Incidencia.findById(idIncidencia)
      .populate("usuarioCreador", "nombre apellidos email telefono -_id")
      .populate("tipoIncidencia", "tipo -_id");
  } catch (err) {
    if (err.message === `Cast to ObjectId failed for value "${err.value}" at path "_id" for model "Incidencia"`) {
      informeRespuesta.error = generaError("La id introducida no tiene la forma correcta", 400);
    }
  }
  if (incidenciaCoincidente && !informeRespuesta.error) {
    informeRespuesta.jsonResponse = estructuraJsonResponse({ incidencia: incidenciaCoincidente });
    await Incidencia.findByIdAndDelete(idIncidencia);
  } else if (!informeRespuesta.error) {
    informeRespuesta.error = generaError("La id introducida no corresponde a ninguna incidencia", 400);
  }
  return informeRespuesta;
};
const votaIncidencia = async (idUsuario, idIncidencia) => {
  const informeRespuesta = new InformeRespuesta();
  const usuarioCoincidente = await Usuario.findById(idUsuario);
  let incidenciaCoincidente;
  try {
    incidenciaCoincidente = await Incidencia.findById(idIncidencia);
  } catch (err) {
    if (err.message === `Cast to ObjectId failed for value "${err.value}" at path "_id" for model "Incidencia"`) {
      informeRespuesta.error = generaError("La id introducida no corresponde a ninguna incidencia", 400);
    }
  }
  if (incidenciaCoincidente && !informeRespuesta.error) {
    const index = usuarioCoincidente.incidenciasVotadas.indexOf(idIncidencia);
    if (index > -1) {
      usuarioCoincidente.incidenciasVotadas.splice(index, 1);
      await incidenciaCoincidente.updateOne({ votos: incidenciaCoincidente.votos - 1 });
    } else {
      usuarioCoincidente.incidenciasVotadas.push(idIncidencia);
      await incidenciaCoincidente.updateOne({ votos: incidenciaCoincidente.votos + 1 });
    }
    console.log(usuarioCoincidente.incidenciasVotadas);
    await usuarioCoincidente.updateOne({ incidenciasVotadas: usuarioCoincidente.incidenciasVotadas });
    informeRespuesta.jsonResponse = estructuraJsonResponse({
      incidencia: { ...incidenciaCoincidente._doc, votos: !(index > -1) ? incidenciaCoincidente.votos + 1 : incidenciaCoincidente.votos - 1 }
    });
  } else if (!informeRespuesta.error) {
    informeRespuesta.error = generaError("La id introducida no corresponde a ninguna incidencia", 400);
  }
  return informeRespuesta;
};

module.exports = {
  getIncidencias,
  getIncidencia,
  getIncidenciasSimilares,
  postIncidencia,
  putIncidencia,
  borrarIncidencia,
  votaIncidencia
};
