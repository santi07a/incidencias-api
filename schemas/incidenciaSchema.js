const getIncidenciaSchema = () => {
  const nombre = {
    isLength: {
      errorMessage: "Falta el nombre de la incidencia",
      options: {
        min: 2
      }
    }
  };
  const usuarioCreador = {
    exists: {
      errorMessage: "Falta el idObject del usuario que creó la incidencia"
    },
    isMongoId: {
      errorMessage: "El usuario creador tiene que ser un ObjectId de Mongo"
    }
  };
  const fotoIncidencia = {
    exists: {
      errorMessage: "Falta la foto de la incidencia"
    }
  };
  const descripcion = {
    exists: {
      errorMessage: "Falta la descripción de la incidencia"
    }
  };
  const direccion = {
    custom: {
      errorMessage: "Se tiene que incluir la dirección de la incidencia o las coordenadas\
       (latitud y longitud)",
      options: (value, { req }) => {
        if (value || (req.body.latitud && req.body.longitud)) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
  const registrada = {
    exists: {
      errorMessage: "Falta la fecha de registro de la incidencia"
    }
  };
  const latitud = {
    custom: {
      errorMessage: "Se tiene que incluir la dirección de la incidencia o las coordenadas\
       (latitud y longitud)",
      options: (value, { req }) => {
        if (req.body.direccion || (value && req.body.longitud)) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
  const longitud = {
    custom: {
      errorMessage: "Se tiene que incluir la dirección de la incidencia o las coordenadas\
       (latitud y longitud)",
      options: (value, { req }) => {
        if (req.body.direccion || (req.body.latitud && value)) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
  const tipoIncidencia = {
    exists: {
      errorMessage: "Falta el tipo de la incidencia"
    }
  };
  const resuelta = {
    exists: {
      errorMessage: "Falta el estado de la incidencia"
    }
  };
  return {
    nombre,
    usuarioCreador,
    fotoIncidencia,
    descripcion,
    direccion,
    registrada,
    latitud,
    longitud,
    tipoIncidencia,
    resuelta
  };
};

module.exports = {
  getIncidenciaSchema
};
