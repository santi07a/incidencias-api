const Incidencia = require("../db/modelos/incidencia");
const { generaError } = require("../errores/errores");

const getIncidencias = async () => {
  const respuesta = {
    error: false,
    incidencias: null
  };
  const incidencias = await Incidencia.find();
  respuesta.incidencias = incidencias;
  return respuesta;
};

module.exports = {
  getIncidencias
};
