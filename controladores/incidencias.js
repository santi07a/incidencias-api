const Incidencia = require("../db/modelos/incidencia");
const { generaError } = require("../errores/errores");

const getIncidencias = async queries => {
  const respuesta = {
    error: false,
    incidencias: null
  };
  const direccionOrden = queries.orden === "DESC" ? -1 : 1;
  const tipoOrden = queries.ordenPor === "fecha" ? "registrada" : "nombre";
  const incidencias = await Incidencia.find()
    .sort({ [tipoOrden]: direccionOrden })
    .limit(queries.nPorPagina ? +queries.nPorPagina : 0)
    .skip(queries.nPorPagina && queries.pagina ? (+queries.nPorPagina * +queries.pagina) - +queries.nPorPagina : 0);
  if (!incidencias) {
    const error = generaError("Error del servidor, no se ha podido realizar la petición", 500);
    respuesta.error = error;
  }
  respuesta.incidencias = incidencias;
  return respuesta;
};
const getIncidencia = async id => {
  const incidencia = await Incidencia.findById(id, "-_id");
  const respuesta = {
    incidencia: null,
    error: null
  };
  if (incidencia) {
    respuesta.incidencia = incidencia;
  } else {
    const error = generaError("La incidencia solicitada no existe", 404);
    respuesta.error = error;
  } return respuesta;
};

const postIncidencia = async (incidenciaRecibida) => {
  const respuesta = {
    error: false,
    incidencia: null
  };
  const nuevaIncidencia = await Incidencia.create(incidenciaRecibida);
  respuesta.incidencia = nuevaIncidencia;
  return respuesta;
};

const putIncidencia = async (incidenciaRecibida, idIncidencia) => {
  const respuesta = {
    incidencia: null,
    error: null
  };
  let incidenciaCoincidente;
  try {
    incidenciaCoincidente = await Incidencia.findById(idIncidencia);
  } catch (err) {
    if (err.message === `Cast to ObjectId failed for value "${err.value}" at path "_id" for model "Incidencia"`) {
      respuesta.error = generaError("La id introducida no tiene la forma correcta", 400);
    }
  }
  if (incidenciaCoincidente && !respuesta.error) {
    await incidenciaCoincidente.updateOne(incidenciaRecibida);
    respuesta.incidencia = incidenciaRecibida;
  } else if (!respuesta.error) {
    /* tendriamos que devolver error si no se encuentra una incidencia coincidente? */
    const { incidencia: incidenciaSustituida, error } = await postIncidencia(incidenciaRecibida);
    respuesta.incidencia = incidenciaSustituida;
    respuesta.error = error;
  }
  return respuesta;
};

const borrarIncidencia = async idIncidencia => {
  const respuesta = {
    incidencia: null,
    error: null
  };
  let incidenciaCoincidente = null;
  try {
    incidenciaCoincidente = await Incidencia.findById(idIncidencia);
    respuesta.incidencia = incidenciaCoincidente;
  } catch (err) {
    if (err.message === `Cast to ObjectId failed for value "${err.value}" at path "_id" for model "Incidencia"`) {
      respuesta.error = generaError("La id introducida no tiene la forma correcta", 400);
    }
  }
  await Incidencia.findByIdAndDelete(idIncidencia);
  return respuesta;
};

module.exports = {
  getIncidencias,
  getIncidencia,
  postIncidencia,
  putIncidencia,
  borrarIncidencia
};
