
class InformeRespuesta {
  error = null;
  jsonResponse = null;
}

const estructuraJsonResponse = datos => {
  const datosNombre = Object.keys(datos)[0];
  return {
    total: datos[datosNombre].length,
    body: {
      ...datos
    }
  };
};

module.exports = {
  InformeRespuesta,
  estructuraJsonResponse
}
