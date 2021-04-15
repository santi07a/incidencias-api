const Incidencia = require("../db/modelos/incidencia");
const { generaError } = require("../errores/errores");

const getIncidencias = async () => {
  const respuesta = {
    error: false,
    incidencias: null
  };
  const incidencias = await Incidencia.find();
  if (!incidencias) {
    const error = generaError("Error del servidor, no se ha podido realizar la petición", 500);
    respuesta.error = error;
  }
  respuesta.incidencias = incidencias;
  return respuesta;
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

module.exports = {
  getIncidencias,
  postIncidencia
};
