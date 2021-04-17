const Incidencia = require("../db/modelos/incidencia");
const { generaError } = require("../errores/errores");
const { InformeRespuesta, estructuraJsonResponse } = require("./utils/respuesta");

const getIncidencias = async queries => {
  const informeRespuesta = new InformeRespuesta();
  const direccionOrden = queries.orden === "DESC" ? -1 : 1;
  const tipoOrden = queries.ordenPor === "fecha" ? "registrada" : "nombre";
  const incidencias = await Incidencia.find()
    .sort({ [tipoOrden]: direccionOrden })
    .limit(queries.nPorPagina ? +queries.nPorPagina : 0)
    .skip(queries.nPorPagina && queries.pagina ? (+queries.nPorPagina * +queries.pagina) - +queries.nPorPagina : 0)
    .populate("usuarioCreador", "nombre apellidos email telefono -_id")
    .populate("tipoIncidencia", "tipo -_id");
  if (!incidencias) {
    const error = generaError("Error del servidor, no se ha podido realizar la petición", 500);
    informeRespuesta.error = error;
  } else {
    informeRespuesta.jsonResponse = estructuraJsonResponse({ incidencias });
  }
  return informeRespuesta;
};

const getIncidencia = async idIncidencia => {
  const informeRespuesta = new InformeRespuesta();
  const incidencia = await Incidencia.findById(idIncidencia, "-_id");
  if (incidencia) {
    informeRespuesta.jsonResponse = estructuraJsonResponse({ incidencia });
  } else {
    const error = generaError("La incidencia solicitada no existe", 404);
    informeRespuesta.error = error;
  } return informeRespuesta;
};

const postIncidencia = async incidenciaRecibida => {
  const informeRespuesta = new InformeRespuesta();
  const fecha = new Date().getTime();
  incidenciaRecibida.registrada = +fecha;
  const nuevaIncidencia = await Incidencia.create(incidenciaRecibida);
  await nuevaIncidencia.updateOne({ fotoIncidencia: `incidencia${nuevaIncidencia.id}.png` });
  informeRespuesta.jsonResponse = estructuraJsonResponse({ incidencia: nuevaIncidencia });
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
    informeRespuesta.jsonResponse = estructuraJsonResponse({ incidencia: incidenciaRecibida });
  } else if (!informeRespuesta.error) {
    /* tendriamos que devolver error si no se encuentra una incidencia coincidente? */
    const { incidencia: incidenciaSustituida, error } = await postIncidencia(incidenciaRecibida);
    informeRespuesta.jsonResponse = estructuraJsonResponse({ incidencia: incidenciaSustituida });
    informeRespuesta.error = error;
  }
  return informeRespuesta;
};

const borrarIncidencia = async idIncidencia => {
  const informeRespuesta = new InformeRespuesta();
  let incidenciaCoincidente = null;
  try {
    incidenciaCoincidente = await Incidencia.findById(idIncidencia);
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

module.exports = {
  getIncidencias,
  getIncidencia,
  postIncidencia,
  putIncidencia,
  borrarIncidencia
};
